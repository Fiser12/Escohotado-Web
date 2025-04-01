import { Block } from 'payload'
import { buttonsSlug } from '@/modules/lexical/blocks/slug-blogs'
import { buttonsField } from '@/modules/lexical/blocks/button-block/button-field'

export const ButtonsBlock: Block = {
  slug: buttonsSlug,
  interfaceName: 'ButtonsBlock',
  labels: {
    singular: 'ButtonsBlock',
    plural: 'ButtonsBlocks',
  },
  fields: [
    buttonsField(4),
    {
      name: 'alignment',
      label: 'Alignment',
      type: 'select',
      defaultValue: 'center',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' }
      ],
    }
  ],
}
