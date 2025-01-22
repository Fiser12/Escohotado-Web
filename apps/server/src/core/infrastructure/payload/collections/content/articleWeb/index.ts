import { COLLECTION_SLUG_ARTICLE_WEB } from '../../config'
import { contentWithPermissionsCollectionBuilder } from '../content_collection_builder'

export const articleWeb = contentWithPermissionsCollectionBuilder({
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
    },
  ]
})
