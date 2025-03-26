import { Block } from 'payload'
import { twoColumnsBlockSlug } from '../slug_blogs'
import { lexicalEditorExcludingBlocks } from '@/lexical/lexicalEditorExcludingBlocks'

const editor = lexicalEditorExcludingBlocks([
  "two_columns_block",
  'wrapper_block'
])

export const TwoColumnsBlock: Block = {
  slug: twoColumnsBlockSlug,
  labels: {
    singular: 'Doble columna',
    plural: 'Doble columnas'
  },
  interfaceName: 'TwoColumnsBlock',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Tipo',
      options: [
        { label: '1x3', value: '1x3' },
        { label: '2x2', value: '2x2' },
        { label: '3x1', value: '3x1' },
      ],
      required: true,
    },
    {
      type: 'richText',
      name: 'left',
      label: 'Izquierda',
      localized: true,
      required: true,
      editor: editor,
    },
    {
      type: 'richText',
      name: 'right',
      label: 'Derecha',
      localized: true,
      required: true,
      editor: editor,
    },
  ],
}

