import { CollectionConfig } from 'payload'
import { isAnyone, isAdmin } from '../../fields/permissions/accessEvaluations'
import { COLLECTION_SLUG_UI_GRID_CARDS } from 'hegel/payload'

export const gridCards: CollectionConfig = {
  slug: COLLECTION_SLUG_UI_GRID_CARDS,
  labels: {
    singular: 'Grid Cards',
    plural: 'Grid Cards',
  },
  admin: {
    group: 'UI',
    useAsTitle: 'title',
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Descripción',
    },
    {
      type: 'text',
      name: 'tailwindGridClassNames',
      label: 'Clases de Tailwind del grid',
      defaultValue: 'grid-cols-1 md:grid-cols-4',
    },
    {
      type: 'array',
      name: 'cards',
      fields: [
        {
          type: 'text',
          name: 'tailwindClassNames',
          label: 'Clases de Tailwind del card',
          required: true,
        },
      ],
    },
  ],
}
