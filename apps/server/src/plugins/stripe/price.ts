import { COLLECTION_SLUG_PRICES } from '@/collections/config'
import { getPayload } from '@/utils/payload'
import { payloadUpsert } from '@/utils/upsert'
import type Stripe from 'stripe'

export function priceUpsert(price: Stripe.Price) {
  const stripeProductID = typeof price.product === 'string' ? price.product : price.product.id
  if (price.deleted) return priceDeleted(price)
  return payloadUpsert({
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
}

const priceDeleted = async (price: Stripe.Price) => {
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