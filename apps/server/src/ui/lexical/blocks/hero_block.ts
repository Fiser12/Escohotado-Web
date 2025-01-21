import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero_block',
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
