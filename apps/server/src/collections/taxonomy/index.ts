import type { CollectionConfig } from 'payload'
import { isAdmin, isAnyone } from '@/utils/access'
import { COLLECTION_SLUG_TAXONOMY } from '../config'
import { populateSeedHook } from './populateSeedHook'
import { v4 as uuid_v4 } from 'uuid'

const taxonomy: CollectionConfig = {
  slug: COLLECTION_SLUG_TAXONOMY,
  labels: {
    singular: 'Taxonomia',
    plural: 'Taxonomias',
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    beforeChange: [populateSeedHook],
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      defaultValue: uuid_v4,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'selectable',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'slug',
      unique: true,
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'seed',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_TAXONOMY,
      hasMany: false,
      required: false,
    },
    {
      name: 'children',
      type: 'join',
      collection: COLLECTION_SLUG_TAXONOMY,
      on: 'parent',
    },
  ],
}

export default taxonomy
