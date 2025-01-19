import {
  BlocksFeature,
  BoldFeature,
  HeadingFeature,
  ItalicFeature,
  lexicalEditor,
  ParagraphFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'
import { GridCardsBlock } from './grid_cards'

const lexicalEditorTwoColumnsBlock = lexicalEditor({
  features: () => {
    return [
      HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      BlocksFeature({ blocks: [GridCardsBlock] }),
    ]
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
