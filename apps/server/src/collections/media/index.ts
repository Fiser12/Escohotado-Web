import type { CollectionConfig } from 'payload'
import { addContentHashToFile } from './addContentHashToFileHook'
import { handleSvgUpload } from './handleSvgUploadHook'
import { isAdmin, isAnyone } from '@/utils/access'
import { COLLECTION_SLUG_MEDIA } from '../config'

const media: CollectionConfig = {
  slug: COLLECTION_SLUG_MEDIA,
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre'
      }
    ],
    adminThumbnail: ({ doc: media }) => (media?.sizes as any)?.thumbnail?.url || media.url
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },
  admin: {
    useAsTitle: 'title'
  },
  hooks: {
    beforeOperation: [addContentHashToFile],
    afterChange: [handleSvgUpload]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        style: { display: 'none' },
        readOnly: true
      }
    },
    {
      name: 'rawContent',
      type: 'textarea',
      admin: {
        disabled: true,
        readOnly: true
      }
    }
  ]
}

export default media