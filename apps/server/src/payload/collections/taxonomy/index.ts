import { COLLECTION_SLUG_TAXONOMY } from '@/core/collections-slugs'
import { slugField } from '@/payload/fields/slug'
import type { CollectionConfig } from 'payload'
import { isAdmin, isAnyone } from 'payload-access-control'

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
    useAsTitle: 'singular_name',
    group: 'Contenido',
  },
  fields: [
    {
      name: 'selectable',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'singular_name',
      label: 'Nombre singular',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'plural_name',
      label: 'Nombre plural',
      type: 'text',
      localized: true,
      required: false,
    },
    ...slugField('singular_name'),
  ],
}

export default taxonomy
