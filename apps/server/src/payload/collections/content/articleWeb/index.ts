import { slugField } from '@/payload/fields/slug'
import { COLLECTION_SLUG_ARTICLE_WEB } from 'hegel/payload'
import { contentWithPermissionsCollectionBuilder } from '../content_collection_builder'
import { quotesJoinField } from '@/payload/fields/quotesJoin/quotesJoinField'

export const articleWeb = contentWithPermissionsCollectionBuilder({
  slug: COLLECTION_SLUG_ARTICLE_WEB,
  labels: {
    singular: 'Articulo Web',
    plural: 'Artículos Web',
  },
  admin: {
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/articulos/${data.slug}`,
    }  
  },
  fields: [
    ...slugField("title"),
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
    },
    quotesJoinField,
  ]
})
