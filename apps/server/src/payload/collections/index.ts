import { users } from '@/payload/collections/user'
import taxonomy from '@/payload/collections/taxonomy'
import media from '@/payload/collections/media'
import { subscriptions } from '@/payload/collections/stripe/subscriptions'
import { prices } from '@/payload/collections/stripe/prices'
import permissions from '@/payload/fields/permissions'
import { products } from '@/payload/collections/stripe/products'
import { contentCollections } from '@/payload/collections/content'
import { uiCollections } from '@/payload/collections/ui'


const collections = [
    users,
    prices,
    products,
    subscriptions,
    media,
    taxonomy,
    ...contentCollections,
    ...uiCollections,
    permissions,
  ]

  export default collections;