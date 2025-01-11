import {
  COLLECTION_SLUG_PRICES,
  COLLECTION_SLUG_PRODUCTS,
} from '@/core/infrastructure/payload/collections/config'
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import type Stripe from 'stripe'
import { payloadUpsert } from '../../utils/upsert'
import { stripeBuilder } from '.'

export const updatePrices = async () => {
  const stripe = await stripeBuilder()
  const prices = await stripe.prices.list({ limit: 100, active: true })
  const promises = prices.data.map(priceUpsert)
  const pricesUpserted = await Promise.all(promises)

  const pricesByProductId = pricesUpserted.mapNotNull(t => t).reduce((acc, { productId, priceId }) => {
    if (!acc[productId]) {
      acc[productId] = [];
    }
    acc[productId].push(priceId);
    return acc;
  }, {} as Record<string, string[]>)

  Object.entries(pricesByProductId).map(async ([productId, prices]) => {
    const payload = await getPayload()
    await payload.update({
      collection: COLLECTION_SLUG_PRODUCTS,
      data: {
        prices
      },
      where: {
        stripeID: { equals: productId },
      },
    })
  })
}

interface PriceUpserted {
  productId: string
  priceId: string
}

export async function priceUpsert(price: Stripe.Price): Promise<PriceUpserted | null> {
  const stripeProductID = typeof price.product === 'string' ? price.product : price.product.id

  if (price.deleted) {
    priceDeleted(price)
    return null
  }
  const priceUpserted = await payloadUpsert({
    collection: COLLECTION_SLUG_PRICES,
    data: {
      stripeID: price.id,
      stripeProductId: stripeProductID,
      active: price.active,
      unitAmount: price.unit_amount as number,
      currency: price.currency,
      type: price.type,
      interval: price.recurring?.interval,
      intervalCount: price.recurring?.interval_count,
    },
    where: {
      stripeID: { equals: price.id },
    },
  })
  if (!priceUpserted) return null
  return { productId: stripeProductID, priceId: priceUpserted.id }
}

export const priceDeleted = async (price: Stripe.Price) => {
  const { id } = price
  const payload = await getPayload()

  try {
    await payload.delete({
      collection: COLLECTION_SLUG_PRICES,
      where: {
        stripeID: { equals: id },
      },
    })
  } catch (error) {
    payload.logger.error(`- Error deleting price: ${error}`)
  }
}
