"use server";

import type Stripe from 'stripe'
import { COLLECTION_SLUG_PRODUCTS, COLLECTION_SLUG_PRICES } from '../../common';
import { payloadUpsert } from '../utils/upsert';
import { stripeBuilder } from '../utils/stripe-builder';
import type { Payload } from 'payload'

export const updatePrices = async (payload: Payload) => {
  const stripe = await stripeBuilder()
  const prices = await stripe.prices.list({ limit: 100, active: true })
  const promises = prices.data.map((price) => priceUpsert(price, payload))
  const pricesUpserted = await Promise.all(promises)

  const pricesByProductId = pricesUpserted
    .mapNotNull((t) => t)
    .reduce(
      (acc, { productId, priceId }) => {
        if (!acc[productId]) {
          acc[productId] = []
        }
        acc[productId].push(priceId)
        return acc
      },
      {} as Record<string, number[]>,
    )

  Object.entries(pricesByProductId).map(async ([productId, prices]) => {
    await payload.update({
      collection: COLLECTION_SLUG_PRODUCTS,
      data: {
        prices,
      },
      where: {
        stripeID: { equals: productId },
      },
    })
  })
}

interface PriceUpserted {
  productId: string
  priceId: number
}

export async function priceUpsert(price: Stripe.Price, payload: Payload): Promise<PriceUpserted | null> {
  const stripeProductID = typeof price.product === 'string' ? price.product : price.product.id

  if (price.deleted) {
    priceDeleted(price, payload)
    return null
  }
  const priceUpserted = await payloadUpsert({
    payload,
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

export const priceDeleted = async (price: Stripe.Price, payload: Payload) => {
  const { id } = price

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
