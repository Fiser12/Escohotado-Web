import { COLLECTION_SLUG_MEDIA } from '@/core/collections-slugs'
import { lexicalEditorExcludingBlocks } from '@/modules/lexical/lexical-editor-excluding-blocks'
import { Block } from 'payload'
import { photosCarouselBlock } from '@/modules/lexical/blocks/slug-blogs'

const editor = lexicalEditorExcludingBlocks([
  'photos_carousel_block',
  'two_columns_block',
  'wrapper_block',
])

export const PhotosCarouselBlock: Block = {
  slug: photosCarouselBlock,
  interfaceName: 'PhotosCarouselBlock',
  labels: {
    singular: 'Carousel de fotos',
    plural: 'Carousels de fotos',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'cover',
          type: 'upload',
          relationTo: COLLECTION_SLUG_MEDIA,
          hasMany: false,
          required: true,
          filterOptions: {
            mimeType: { contains: 'image' },
          },
        },
        {
          label: 'Título',
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          label: 'Año',
          name: 'year',
          type: 'number',
        },
        {
          label: 'Descripción',
          name: 'description',
          type: 'richText',
          localized: true,
          editor,
        },
      ],
    },
  ],
}
