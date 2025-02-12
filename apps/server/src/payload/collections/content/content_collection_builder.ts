import type { CollectionConfig } from 'payload'
import {
  permissionRelationship,
  cachePermissionSeedsHook,
} from '@/payload/fields/permissions/permissionsRelationshipFields'
import { COLLECTION_SLUG_MEDIA } from 'hegel/payload'
import { checkReadPermissions, isAdmin } from '../../fields/permissions/accessEvaluations'
import { taxonomyRelationship } from '../../fields/taxonomies/taxonomiesRelationshipFields'
import { forumPostsCacheField } from '../../fields/forum/forumPostsCacheField'


export function contentWithPermissionsCollectionBuilder(
  config: Partial<CollectionConfig> & { slug: string },
): CollectionConfig {
  const contentCollection = contentCollectionBuilder(config)
  return {
    ...contentCollection,
    access: {
      read: checkReadPermissions,
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
    hooks: {
      ...contentCollection.hooks,
      beforeChange: [...(contentCollection.hooks?.beforeChange ?? []), cachePermissionSeedsHook()],
    },
    fields: [...permissionRelationship(), ...(contentCollection.fields ?? [])],
  }
}

export function contentCollectionBuilder(
  config: Partial<CollectionConfig> & { slug: string },
): CollectionConfig {
  return {
    ...config,
    access: {
      create: isAdmin,
      update: isAdmin,
      delete: isAdmin,
    },
    admin: {
      ...config.admin,
      useAsTitle: 'title',
      group: 'Contenido',
      components: {
        views: {
          list: {
            actions: [{ path: '/src/ui/payload_admin/sync_forum_posts_button' }],
          },
        },
      },
    },
    hooks: {
      ...config.hooks
    },
    fields: [
      {
        name: 'cover',
        type: 'upload',
        relationTo: COLLECTION_SLUG_MEDIA,
        hasMany: false,
        required: true,
        filterOptions: {
          mimeType: { contains: 'image' },
        },
      },
      {
        name: 'title',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'publishedAt',
        label: 'Fecha de publicación',
        type: 'date',
      },
      taxonomyRelationship,
      ...(config.fields ?? []),
      forumPostsCacheField,
    ],
  }
}
