import { quotesJoinField } from '@/payload/fields/quotesJoin/quotesJoinField'
import { addContentHashToFile } from '../../../hooks/media/addContentHashToFileHook'
import { COLLECTION_SLUG_ARTICLE_PDF, routes } from 'hegel/payload'
import { contentWithPermissionsCollectionBuilder } from '../content_collection_builder'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

export const articlePDF = contentWithPermissionsCollectionBuilder({
  slug: COLLECTION_SLUG_ARTICLE_PDF,
  labels: {
    singular: 'Articulo PDF',
    plural: 'Artículos PDF',
  },
  upload: {
    mimeTypes: ['application/pdf'],
  },
  hooks: {
    beforeOperation: [addContentHashToFile]
  },
  admin: {
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}${routes.nextJS.generateDetailHref({ collection: COLLECTION_SLUG_ARTICLE_PDF, value: { id: data.id } })}`,
    }  
  },
  fields: [
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
    },
    lexicalHTML('content', { name: 'content_html' }),
    quotesJoinField,    
  ]
})
