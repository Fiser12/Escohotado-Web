import { Block } from 'payload'
import { highlightSlug } from '../slug_blogs'

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
    }
  ],
}
