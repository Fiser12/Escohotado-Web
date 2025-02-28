import { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_VIDEO } from 'hegel/payload'
import {
  cachePermissionSeedsHook,
  permissionRelationship,
} from '@/payload/fields/permissions/permissionsRelationshipFields'
import { isAnyone, isAdmin } from '../../../fields/permissions/accessEvaluations'

import { forumPostsCacheField } from '../../../fields/forum/forumPostsCacheField'
import { taxonomyRelationship } from '@/payload/fields/taxonomies/taxonomiesRelationshipFields'
import { quotesJoinField } from '@/payload/fields/quotesJoin/quotesJoinField'

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
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/videos/${data.id}`,
    },
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
    beforeChange: [cachePermissionSeedsHook()],
  },
  fields: [
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
      localized: true
    },
    {
      type: 'row',
      fields: [
        {
          label: 'URL Vídeo (Privada)',
          name: 'url',
          type: 'text',
          localized: true,
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
      localized: true,
      admin: {
        readOnly: true,
      },
    },
    quotesJoinField,
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
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'viewCount',
      label: 'Vistas',
      type: 'number',
    },
    {
      name: 'duration',
      label: 'Duración (segundos)',
      type: 'number',
    },
    {
      name: 'publishedAt',
      label: 'Fecha de publicación',
      type: 'date',
    },
    taxonomyRelationship,
    forumPostsCacheField,
  ],
}
