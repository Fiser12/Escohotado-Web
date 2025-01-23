import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_TAXONOMY } from '../config'
import { v4 as uuid_v4 } from 'uuid'
import { isAnyone, isAdmin } from '../../fields/permissions/accessEvaluations'
import { slugField } from '@/payload/fields/slug'

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
    group: 'Contenido'
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
    ...slugField("singular_name")
  ],
}

export default taxonomy
