import { Block } from 'payload'
import { buttonsSlug } from '../slug_blogs'
import { buttonsField } from '../button_block/buttonField'

export const ButtonsBlock: Block = {
  slug: buttonsSlug,
  interfaceName: 'ButtonsBlock',
  labels: {
    singular: 'ButtonsBlock',
    plural: 'ButtonsBlocks',
  },
  fields: [
    buttonsField(4)
  ],
}
