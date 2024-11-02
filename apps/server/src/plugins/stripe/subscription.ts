import { COLLECTION_SLUG_USER, COLLECTION_SLUG_PRODUCTS, COLLECTION_SLUG_SUBSCRIPTIONS } from '@/collections/config'
import { getPayload } from '@/utils/payload'
import { payloadUpsert } from '@/utils/upsert'
import type Stripe from 'stripe'

const logs = false

export const subscriptionUpsert = async (subscription: Stripe.Subscription) => {
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
    trial_end
  } = subscription
  const payload = await getPayload()

  try {
    const userQuery = await payload.find({
      collection: COLLECTION_SLUG_USER,
      where: {
        id: { equals: metadata.userId }
      }
    })

    const userID = userQuery.docs?.[0]?.id
    if (!userID) return
    const subscriptionItem = subscription.items.data.at(0)

    const { docs: products } = await payload.find({
      collection: COLLECTION_SLUG_PRODUCTS,
      where: {
        stripeID: { equals: subscriptionItem?.plan?.product }
      }
    })
    const productID = products.at(0)?.id
    if (!productID) return

    const subscriptionData = {
      stripeID,
      stripeCustomerId: customer as string,
      product: productID,
      user: userID,
      status,
      metadata,
      cancelAtPeriodEnd: cancel_at_period_end,
      created: new Date().toISOString(),
      currentPeriodStart: new Date(current_period_start * 1000).toISOString(),
      currentPeriodEnd: new Date(current_period_end * 1000).toISOString(),
      endedAt: ended_at ? new Date(ended_at * 1000).toISOString() : null,
      cancelAt: cancel_at ? new Date(cancel_at * 1000).toISOString() : null,
      canceledAt: canceled_at ? new Date(canceled_at * 1000).toISOString() : null,
      trialStart: trial_start ? new Date(trial_start * 1000).toISOString() : null,
      trialEnd: trial_end ? new Date(trial_end * 1000).toISOString() : null
    }

    await payloadUpsert({
      collection: COLLECTION_SLUG_SUBSCRIPTIONS,
      data: subscriptionData,
      where: {
        stripeID: { equals: stripeID }
      }
    })

    if (logs) {
      payload.logger.info(`✅ Successfully updated subscription with Stripe ID: ${stripeID}`)
    }
  } catch (error) {
    payload.logger.error(`- Error managing subscription: ${error}`)
  }
}

export const subscriptionDeleted = async (subscription: Stripe.Subscription) => {
  const payload = await getPayload()
  const { id: stripeSubscriptionID } = subscription

  try {
    await payload.delete({
      collection: COLLECTION_SLUG_SUBSCRIPTIONS,
      where: {
        stripeSubscriptionId: { equals: stripeSubscriptionID }
      }
    })

    if (logs) payload.logger.info(`✅ Successfully deleted subscription with Stripe ID: ${stripeSubscriptionID}`)
  } catch (error) {
    payload.logger.error(`- Error deleting subscription: ${error}`)
  }
}