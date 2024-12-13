import { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_VIDEO } from '../../config'
import { isAdmin, isAnyone } from '@/utils/access'
import { getYoutubeVideoMetadataHook } from './getYoutubeMetadata'
import { cachePermissionSeedsHook, permissionRelationship } from '@/collections/permissions/permissionsRelationshipFields'

const [permissionRelationshipField, permissionSeedField] = permissionRelationship()
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
      cachePermissionSeedsHook(),
      getYoutubeVideoMetadataHook,
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          label: 'URL Vídeo YT',
          name: 'url',
          type: 'text',
          required: true,
          unique: true
        },
        permissionRelationshipField,
      ]
    },
    {
      label: 'URL Vídeo YT (free, sin permisos)',
      name: 'url_free',
      type: 'text'
    },
    permissionSeedField,
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
    }
  ],
}
