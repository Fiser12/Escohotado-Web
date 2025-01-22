import { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_VIDEO } from '../../config'
import {
  cachePermissionSeedsHook,
  permissionRelationship,
} from '@/payload/fields/permissions/permissionsRelationshipFields'
import { isAnyone, isAdmin } from '../../../fields/permissions/accessEvaluations'

import { getYoutubeVideoMetadataHook } from '../../../hooks/video/getYoutubeMetadataHook'
import { forumPostsCacheField } from '../../../fields/forum/forumPostsCacheField'

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
    components: {
      views: {
        list: {
          actions: [
            { path: '/src/ui/payload_admin/refresh_yt_collection_button' },
            { path: '/src/ui/payload_admin/sync_forum_posts_button' },
          ],
        },
      },
    },
  },
  hooks: {
    beforeChange: [cachePermissionSeedsHook(), getYoutubeVideoMetadataHook],
  },
  fields: [
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
    },
    {
      type: 'row',
      fields: [
        {
          label: 'URL Vídeo (Privada)',
          name: 'url',
          type: 'text',
          required: true,
          unique: true,
        },
        permissionRelationshipField,
      ],
    },
    {
      label: 'URL Vídeo YT (Pública)',
      name: 'url_free',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    permissionSeedField,
    {
      label: 'Youtube Tags',
      name: 'tags',
      type: 'json',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      label: 'Thumbnail URL',
      name: 'thumbnailUrl',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'publishedAt',
      label: 'Fecha de publicación',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    forumPostsCacheField,
  ],
}
