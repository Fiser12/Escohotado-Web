import { Block } from 'payload'
import { highlightSlug } from '@/modules/lexical/blocks/slug-blogs'
import { buttonsField } from '@/modules/lexical/blocks/button-block/button-field'

export const HighlightBlock: Block = {
  slug: highlightSlug,
  interfaceName: 'HighlightBlock',
  labels: {
    singular: 'Highlight',
    plural: 'Highlight',
  },
  fields: [
    {
      label: 'Contenido',
      name: 'content',
      type: 'textarea',
      localized: true
    },
    {
      label: 'Estilo del fondo',
      name: 'background_style',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Gris', value: 'primary' },
        { label: 'Blanco', value: 'secondary' }
      ],
    },
    buttonsField(3)
  ],
}
