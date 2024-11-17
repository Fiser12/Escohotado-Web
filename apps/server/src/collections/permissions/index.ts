import type { CollectionConfig } from 'payload'
import { isAdmin, isAnyone } from '@/utils/access'
import { COLLECTION_SLUG_PERMISSION } from '../config'
import { v4 as uuid_v4 } from 'uuid'

const permision: CollectionConfig = {
  slug: COLLECTION_SLUG_PERMISSION,
  labels: {
    singular: 'Permiso',
    plural: 'Permisos',
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Auth',
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      defaultValue: uuid_v4,
      admin: { position: 'sidebar', readOnly: true },
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
    }
  ]
}

export default permision
