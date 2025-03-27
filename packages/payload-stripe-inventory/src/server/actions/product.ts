"use server";

import type Stripe from 'stripe'
import type { Payload } from 'payload'
import { payloadUpsert } from '../utils/upsert';
import { stripeBuilder } from '../utils/stripe-builder';
import { COLLECTION_SLUG_PRODUCTS } from '../../common';

const logs = false

export const updateProducts = async (payload: Payload) => {
  const stripe = await stripeBuilder()
  const products = await stripe.products.list({ limit: 100, active: true })
  products.data.forEach((product) => productSync(product, payload))
}

export const productSync = async (object: Stripe.Product, payload: Payload) => {
  const { id: stripeProductID, name, description, images } = object
  if (object.deleted) return productDeleted(object, payload)
  try {
    await payloadUpsert({
      payload,
      collection: COLLECTION_SLUG_PRODUCTS,
      data: {
        prices: [],
        stripeID: stripeProductID,
        active: true,
        metadata: object.metadata,
        type: object.type,
        name,
        description,
        images: images?.map((image) => ({ url: image })) || [],
      },
      where: {
        stripeID: { equals: stripeProductID },
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const productDeleted = async (object: Stripe.Product, payload: Payload) => {
  const { id: stripeProductID } = object

  try {
    const productQuery = await payload.find({
      collection: COLLECTION_SLUG_PRODUCTS,
      where: {
        stripeID: { equals: stripeProductID },
      },
    })

    const payloadProductID = productQuery.docs?.[0]?.id

    if (payloadProductID) {
      await payload.delete({
        collection: COLLECTION_SLUG_PRODUCTS,
        id: payloadProductID,
      })

      if (logs)
        payload.logger.info(`✅ Successfully deleted product with Stripe ID: ${stripeProductID}`)
    }
  } catch (error) {
    payload.logger.error(`- Error deleting product: ${error}`)
  }
}
