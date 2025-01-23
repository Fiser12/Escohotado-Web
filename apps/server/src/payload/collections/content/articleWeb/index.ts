import { slugField } from '@/payload/fields/slug'
import { COLLECTION_SLUG_ARTICLE_WEB } from '../../config'
import { contentWithPermissionsCollectionBuilder } from '../content_collection_builder'

export const articleWeb = contentWithPermissionsCollectionBuilder({
  slug: COLLECTION_SLUG_ARTICLE_WEB,
  labels: {
    singular: 'Articulo Web',
    plural: 'Artículos Web',
  },
  fields: [
    ...slugField("title"),
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
    },
  ]
})
