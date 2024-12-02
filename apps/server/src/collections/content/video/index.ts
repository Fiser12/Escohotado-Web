import { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_VIDEO } from '../../config'
import { categoriesRelationship } from '../content_collection_builder'
import { isAdmin, isAnyone } from '@/utils/access'
import { getYouTubeVideoMetadata } from './getYoutubeMetadata'

export const video: CollectionConfig = {
  slug: COLLECTION_SLUG_VIDEO,
  labels: {
    singular: 'YT Vídeo',
    plural: 'YT Vídeos',
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
    beforeChange: [
      categoriesRelationship.hook,
      async ({ data }) => {
        return { 
            ...data, 
            ...await getYouTubeVideoMetadata(data.url)
        }
      },
    ],
  },
  fields: [
    {
      label: 'URL Vídeo YT',
      name: 'url',
      type: 'text',
      required: true,
      unique: true
    },
    {
        label: 'Youtube Tags',
        name: 'tags',
        type: 'json',
        admin: {
            readOnly: true,
            position: 'sidebar'
        }
    },
    {
      label: 'Thumbnail URL',
      name: 'thumbnailUrl',
      type: 'text',
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        readOnly: true,
      }
    },
    {
      name: 'publishedAt',
      label: 'Fecha de publicación',
      type: 'date',
      admin: {
        readOnly: true,
      }
    },
    ...categoriesRelationship.fields,
  ],
}
