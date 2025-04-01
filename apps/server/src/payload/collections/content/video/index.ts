import { COLLECTION_SLUG_VIDEO } from '@/core/collections-slugs'
import { forumPostsCacheField } from '@/payload/fields/forum/forumPostsCacheField'
import { taxonomyRelationship } from '@/payload/fields/taxonomies/taxonomiesRelationshipFields'
import { CollectionConfig } from 'payload'
import {
  cachePermissionSeedsHook,
  isAdmin,
  isAnyone,
  permissionRelationship,
} from 'payload-access-control'

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
            { path: '/src/modules/payload-admin/refresh-yt-collection-button' },
            { path: '/src/modules/payload-admin/sync-forum-posts-button' },
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
      localized: true,
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
