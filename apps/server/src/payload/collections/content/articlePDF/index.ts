import { quotesJoinField } from '@/payload/fields/quotesJoin/quotesJoinField'
import { addContentHashToFile } from '../../../hooks/media/addContentHashToFileHook'
import { COLLECTION_SLUG_ARTICLE_PDF } from 'hegel/payload'
import { contentWithPermissionsCollectionBuilder } from '../content_collection_builder'

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
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/articulos/pdf/${data.id}`,
    }  
  },
  fields: [
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
    },
    quotesJoinField,    
  ]
})
