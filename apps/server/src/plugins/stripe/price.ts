import { COLLECTION_SLUG_PRICES, COLLECTION_SLUG_PRODUCTS } from '@/collections/config'
import { getPayload } from '@/utils/payload'
import { payloadUpsert } from '@/utils/upsert'
import type Stripe from 'stripe'

export async function priceUpsert(price: Stripe.Price) {
  const stripeProductID = typeof price.product === 'string' ? price.product : price.product.id
  const payload = await getPayload()
  const productsQuery = await payload.find({
    collection: COLLECTION_SLUG_PRODUCTS,
    where: {
      stripeID: { equals: stripeProductID }
    }
  })

  if (price.deleted) return priceDeleted(price)
  await payloadUpsert({
    collection: COLLECTION_SLUG_PRICES,
    data: {
      stripeID: price.id,
      stripeProductId: stripeProductID,
      active: price.active,
      unitAmount: price.unit_amount as number,
      currency: price.currency,
      type: price.type,
      interval: price.recurring?.interval,
      intervalCount: price.recurring?.interval_count
    },
    where: {
      stripeID: { equals: price.id }
    }
  })

  await payload.update({
    collection: COLLECTION_SLUG_PRODUCTS,
    data: {
      prices: productsQuery.docs?.[0]?.prices?.concat(price.id)
    },
    where: {
      stripeID: { equals: stripeProductID }
    }
  })
}

export const priceDeleted = async (price: Stripe.Price) => {
  const { id } = price
  const payload = await getPayload()

  try {
    await payload.delete({
      collection: COLLECTION_SLUG_PRICES,
      where: {
        stripeID: { equals: id }
      }
    })
  } catch (error) {
    payload.logger.error(`- Error deleting price: ${error}`)
  }
}