import type Stripe from 'stripe'
import { generateUserInventory, UserInventory } from 'payload-access-control'
import { Payload } from 'payload'
import { COLLECTION_SLUG_PRODUCTS, COLLECTION_SLUG_USER } from '../constants/collections'

const logs = false

export const subscriptionUpsert = async (
  subscription: Stripe.Subscription, 
  payload: Payload,
  onSubscriptionUpdate: (type: "create" | "delete", userId: string) => Promise<void>
) => {
  const {
    id: stripeID,
    customer,
    status,
    metadata,
    cancel_at_period_end,
    current_period_start,
    current_period_end,
    ended_at,
    cancel_at,
    canceled_at,
    trial_start,
    trial_end,
  } = subscription
  try {
    const userQuery = await payload.find({
      collection: COLLECTION_SLUG_USER,
      where: {
        id: { equals: metadata.userId },
      },
    })

    const user = userQuery.docs?.[0]
    if (!user) return
    const subscriptionItem = subscription.items.data.at(0)
    if (!subscriptionItem) return

    const { docs: products } = await payload.find({
      collection: COLLECTION_SLUG_PRODUCTS,
      where: {
        stripeID: { equals: subscriptionItem.price.product },
      },
    })
    const product = products.at(0)
    if (!product) return

    const inventory =
      (user.inventory as UserInventory | undefined) ?? generateUserInventory(customer as string)
    inventory.subscriptions[stripeID] = {
      productId: product.id as number,
      permissions: product.permissions_seeds?.split(',') ?? [],
      stripeData: {
        createdAt: new Date(),
        customerId: customer as string,
        metadata,
        priceId: subscriptionItem.price.id,
        subscriptionId: stripeID,
      },
      subscriptionStatus: status,
      subscriptionStripeData: {
        cancelAt: cancel_at ? new Date(cancel_at * 1000) : null,
        canceledAt: canceled_at ? new Date(canceled_at * 1000) : null,
        endedAt: ended_at ? new Date(ended_at * 1000) : null,
        currentPeriodStart: new Date(current_period_start * 1000),
        currentPeriodEnd: new Date(current_period_end * 1000),
        canceledAtPeriodEnd: cancel_at_period_end,
        trial: {
          start: trial_start ? new Date(trial_start * 1000) : null,
          end: trial_end ? new Date(trial_end * 1000) : null,
        },
      },
    }
    await payload.update({
      collection: COLLECTION_SLUG_USER,
      data: { inventory: inventory as any },
      where: { id: { equals: user.id } },
    })

    if (['active', 'trialing'].includes(status)) {
      await onSubscriptionUpdate('create', metadata.keycloakUserId)
    }
    if (logs) {
      payload.logger.info(`✅ Successfully updated subscription with Stripe ID: ${stripeID}`)
    }
  } catch (error) {
    payload.logger.error(`- Error managing subscription: ${error}`)
  }
}

export const subscriptionDeleted = async (
  subscription: Stripe.Subscription, 
  payload: Payload,
  onSubscriptionUpdate: (type: "create" | "delete", userId: string) => Promise<void>
) => {
  const { id, metadata } = subscription

  try {
    const user = await payload.findByID({
      collection: COLLECTION_SLUG_USER,
      id: metadata.userId,
    })
    const inventory = user?.inventory as UserInventory | undefined
    if (!inventory) return
    delete inventory.subscriptions[id]
    await payload.update({
      collection: COLLECTION_SLUG_USER,
      data: { inventory: inventory as any },
      where: { id: { equals: user.id } },
    })
    await onSubscriptionUpdate('delete', metadata.keycloakUserId)

    if (logs) payload.logger.info(`✅ Successfully deleted subscription with Stripe ID: ${id}`)
  } catch (error) {
    payload.logger.error(`- Error deleting subscription: ${error}`)
  }
}
