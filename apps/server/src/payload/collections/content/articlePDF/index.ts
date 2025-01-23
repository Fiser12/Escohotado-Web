import { addContentHashToFile } from '../../../hooks/media/addContentHashToFileHook'
import { COLLECTION_SLUG_ARTICLE_PDF } from '../../config'
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
  fields: [
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
    }
  ]
})
