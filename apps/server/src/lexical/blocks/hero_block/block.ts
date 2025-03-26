import { Block } from 'payload'
import { heroBlock } from '../slug_blogs'
import { lexicalEditorExcludingBlocks } from '@/lexical/lexicalEditorExcludingBlocks'
import { COLLECTION_SLUG_MEDIA } from '@/core/collectionsSlugs'

const editor = lexicalEditorExcludingBlocks([
  'photos_carousel_block',
  'two_columns_block',
  'wrapper_block',
  'hero_block',
])

export const HeroBlock: Block = {
  slug: heroBlock,
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: COLLECTION_SLUG_MEDIA,
      hasMany: false,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          label: 'Invertido',
          name: 'inverted',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          type: 'select',
          label: 'Tipo de media',
          name: 'media_type',
          options: [
            { label: 'Normal', value: 'normal' },
            { label: 'Autoplay & Muted (Si es vídeo)', value: 'muted' },
          ],
          defaultValue: 'normal',
        },
      ],
    },
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
      localized: true,
      editor,
    },
  ],
}
