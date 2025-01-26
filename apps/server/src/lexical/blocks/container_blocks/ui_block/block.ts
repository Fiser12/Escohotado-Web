import { Block } from 'payload'
import { uiBlockSlug } from '../../slug_blogs'

export const UIBlock: Block = {
  slug: uiBlockSlug,
  interfaceName: 'UIBlock',
  labels: {
    singular: 'UI Block',
    plural: 'UI Blocks',
  },
  fields: [
    {
      label: 'UI Block',
      name: 'uiBlock',
      type: 'relationship',
      relationTo: ['ui_block'],
    }
  ],
}

