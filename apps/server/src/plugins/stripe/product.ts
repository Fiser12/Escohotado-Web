import { COLLECTION_SLUG_PRODUCTS } from '@/collections/config'
import { getPayload } from '@/utils/payload'
import { payloadUpsert } from '@/utils/upsert'
import type Stripe from 'stripe'

const logs = false

export const productSync = async (object: Stripe.Product) => {
  const { id: stripeProductID, name, description, images } = object
  if (object.deleted) return productDeleted(object)

  try {
    await payloadUpsert({
      collection: COLLECTION_SLUG_PRODUCTS,
      data: {
        active: true,
        name,
        description,
        image: images?.[0] || '',
        skipSync: true
      },
      where: {
        stripeID: { equals: stripeProductID }
      }
    })

  } catch (error) {
    console.error(error)
  }
}

const productDeleted = async (object: Stripe.Product) => {
  const { id: stripeProductID } = object
  const payload = await getPayload()

  try {
    const productQuery = await payload.find({
      collection: COLLECTION_SLUG_PRODUCTS,
      where: {
        stripeID: { equals: stripeProductID }
      }
    })

    const payloadProductID = productQuery.docs?.[0]?.id

    if (payloadProductID) {
      await payload.delete({
        collection: COLLECTION_SLUG_PRODUCTS,
        id: payloadProductID
      })

      if (logs) payload.logger.info(`✅ Successfully deleted product with Stripe ID: ${stripeProductID}`)
    }
  } catch (error) {
    payload.logger.error(`- Error deleting product: ${error}`)
  }
}