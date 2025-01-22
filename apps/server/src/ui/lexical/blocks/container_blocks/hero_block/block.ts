import { Block } from 'payload'
import { heroBlockSlug } from '../../slug_blogs'

export const HeroBlock: Block = {
  slug: heroBlockSlug,
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero panel',
    plural: 'Hero panel',
  },
  fields: [
    {
      label: 'Descripción',
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      type: 'array',
      name: 'buttons',
      fields: [
        {
          label: 'Título del botón',
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          label: 'Enlace del botón',
          name: 'link',
          type: 'text',
          localized: true,
          required: true,
        }
      ],
    },
  ],
}

