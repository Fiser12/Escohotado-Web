import { Block } from 'payload'
import { internalLexicalBlocksExcluding } from '../../../internalLexicalBuilder'
import { buildLexical } from '../../../lexicalBuilder'
import { twoColumnsBlockSlug } from '../../slug_blogs'

const editor = buildLexical(() => internalLexicalBlocksExcluding(["two_columns_block"]))

export const TwoColumnsBlock: Block = {
  slug: twoColumnsBlockSlug,
  labels: {
    singular: 'Bloque de dos columnas',
    plural: 'Bloques de dos columnas'
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
      required: true,
      editor: editor,
    },
    {
      type: 'richText',
      name: 'right',
      label: 'Derecha',
      required: true,
      editor: editor,
    },
  ],
}

