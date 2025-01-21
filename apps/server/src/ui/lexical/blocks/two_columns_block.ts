import {
  lexicalEditor
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { GridCardsBlock } from './grid_cards_block'
import { getLexicalFeaturesExcluding } from '@/core/infrastructure/payload/fields/defaultLexical'

const lexicalEditorTwoColumnsBlock = lexicalEditor({
  features: () => {
    return getLexicalFeaturesExcluding(['two_columns_block'])
  },
})

export const TwoColumnsBlock: Block = {
  slug: 'two_columns_block',
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
      editor: lexicalEditorTwoColumnsBlock,
    },
    {
      type: 'richText',
      name: 'right',
      label: 'Derecha',
      required: true,
      editor: lexicalEditorTwoColumnsBlock,
    },
  ],
}
