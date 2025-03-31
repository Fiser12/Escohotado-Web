import type { CollectionConfig } from 'payload'
import {
  permissionRelationship,
  cachePermissionSeedsHook,
  checkReadPermissions,
  checkWritePermissions,
  isAdmin,
} from 'payload-access-control'
import { COLLECTION_SLUG_MEDIA } from '@/core/collectionsSlugs'
import { taxonomyRelationship } from '@/payload/fields/taxonomies/taxonomiesRelationshipFields'
import { forumPostsCacheField } from '@/payload/fields/forum/forumPostsCacheField'
import { clearCache } from 'nextjs-query-cache'

export function contentWithPermissionsCollectionBuilder(
  config: Partial<CollectionConfig> & { slug: string },
  localized?: boolean,
): CollectionConfig {
  const contentCollection = contentCollectionBuilder(config, localized)
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
    fields: [
      ...permissionRelationship(),
      {
        name: 'cover',
        type: 'upload',
        relationTo: COLLECTION_SLUG_MEDIA,
        hasMany: false,
        filterOptions: {
          mimeType: { contains: 'image' },
        },
      },
      ...(contentCollection.fields ?? []),
    ],
  }
}

export function contentCollectionBuilder(
  config: Partial<CollectionConfig> & { slug: string },
  localized?: boolean,
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
            actions: [{ path: '/src/modules/payload_admin/sync_forum_posts_button' }],
          },
        },
      },
    },
    hooks: {
      ...config.hooks,
    },
    fields: [
      {
        label: 'Título',
        name: 'title',
        type: 'text',
        required: true,
        localized: localized ?? false,
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

export const addClearCacheHookBeforeChange = (collection: CollectionConfig): CollectionConfig => {
  return {
    ...collection,
    hooks: {
      ...collection.hooks,
      beforeChange: [...(collection.hooks?.beforeChange || []), clearCache],
    },
  }
}
