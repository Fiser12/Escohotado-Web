import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_MEDIA } from 'hegel/payload'
import { addContentHashToFile } from '../../hooks/media/addContentHashToFileHook'
import { handleSvgUpload } from '../../hooks/media/handleSvgUploadHook'
import { updateCacheControl } from '../../hooks/media/updateCacheControl'
import { isAnyone, isAdmin } from 'payload-access-control'

const media: CollectionConfig = {
  slug: COLLECTION_SLUG_MEDIA,
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: ({ doc: media }) => (media?.sizes as any)?.thumbnail?.url || media.url,
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenido',
  },
  hooks: {
    beforeOperation: [addContentHashToFile],
    afterChange: [updateCacheControl, handleSvgUpload],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        style: { display: 'none' },
        readOnly: true,
      },
    },
    {
      name: 'rawContent',
      type: 'textarea',
      admin: {
        disabled: true,
        readOnly: true,
      },
    },
  ],
}

export default media
