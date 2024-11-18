import { addContentHashToFile } from '../../media/addContentHashToFileHook'
import { COLLECTION_SLUG_ARTICLE_PDF } from '../../config'
import { contentCollectionBuilder } from '../content_collection_builder'

export const articlePDF = contentCollectionBuilder({
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
  }
})
