import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_PERMISSION } from 'hegel/payload'
import { isAnyone, isAdmin } from '@/payload/fields/permissions/accessEvaluations'
import { slugField } from '@/payload/fields/slug'

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
    ...slugField(),
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
}

export default permision
