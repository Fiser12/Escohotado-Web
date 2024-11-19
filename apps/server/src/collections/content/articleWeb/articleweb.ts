import { COLLECTION_SLUG_ARTICLE_WEB } from '../../config'
import { contentCollectionBuilder } from '../content_collection_builder'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const articleWeb = contentCollectionBuilder({
  slug: COLLECTION_SLUG_ARTICLE_WEB,
  labels: {
    singular: 'Articulo Web',
    plural: 'Artículos Web',
  },
  fields: [
    {
      label: 'Slug',
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
    }
  ]
})
