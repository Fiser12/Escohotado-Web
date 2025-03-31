import { users } from '@/payload/collections/user/user'
import taxonomy from '@/payload/collections/taxonomy'
import media from '@/payload/collections/media'
import { prices, products } from 'payload-stripe-inventory/server'
import { contentCollections } from '@/payload/collections/content'
import { uiCollections } from '@/payload/collections/ui'
import { addClearCacheHookBeforeChange } from '@/payload/collections/content/content_collection_builder'
import { permissionCollection } from 'payload-access-control'

const collections = [
  users,
  prices,
  products,
  media,
  addClearCacheHookBeforeChange(taxonomy),
  ...contentCollections,
  ...uiCollections,
  permissionCollection,
]

export default collections
