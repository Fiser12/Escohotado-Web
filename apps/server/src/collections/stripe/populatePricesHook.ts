import { stripeBuilder, priceUpsert } from '@/plugins/stripe'
import { Price } from 'payload-types'
import { COLLECTION_SLUG_PRICES } from '../config'
import { CollectionBeforeChangeHook } from 'payload'
import "hegel";

export const populatePricesHook: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (!data.stripeID.startsWith('prod_')) return data
  const stripe = stripeBuilder()
  const { data: prices } = await stripe.prices.list({
    limit: 100,
    product: data.stripeID,
    active: true
  })

  const priceIds = prices.map((price) => price.id)

  const { docs } = (await req.payload.find({
    collection: COLLECTION_SLUG_PRICES,
    where: { stripeID: { in: priceIds } },
  })) as { docs: Price[] }

  const existingPriceIds = new Set(docs.map((doc) => doc.stripeID))

  const missingPrices = prices.filter((price) => !existingPriceIds.has(price.id))

  if (missingPrices.length > 0) {
    const newDocs = await Promise.all(
      missingPrices.mapNotNull(async (price) => {
        const newPriceDoc = await priceUpsert(price)
        return newPriceDoc
      }),
    )
    docs.push(...(newDocs.filter((doc) => doc != null) as Price[]))
  }

  data.prices = docs.map((doc) => doc.id)

  return data
}

