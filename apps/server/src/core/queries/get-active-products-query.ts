'use server'

import { getPayload } from '@/payload/utils/get-payload'
import { Product } from 'payload-types'

export const getActiveProducts = async (): Promise<Product[]> => {
  const payload = await getPayload()
  const products = await payload.find({
    collection: 'products',
    where: {
      active: { equals: true },
    },
  })
  return products.docs
}
