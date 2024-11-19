import type { Access, CollectionConfig } from 'payload'
import { checkReadPermissions, isAdmin } from '@/utils/access'
import { taxonomiesRelationshipBuilder } from '@/collections/taxonomy/taxonomiesRelationshipFields'
import { permissionRelationship, populatePermissionSeedsHook } from '@/collections/permissions/permissionsRelationshipFields'
import { COLLECTION_SLUG_MEDIA } from '../config'

const categoriesRelationship = taxonomiesRelationshipBuilder({
  relationship: { 
    name: 'categories', 
    label: 'Categorías'
  },
  seeds: { name: 'seeds', label: 'Semillas de categorías' }
})

export function contentCollectionBuilder(config: Partial<CollectionConfig> & { slug: string }): CollectionConfig {
    return {
        ...config,
        access: {
          read: checkReadPermissions,
          create: isAdmin,
          update: isAdmin,
          delete: isAdmin
        },
        admin: {
          useAsTitle: 'title',
          group: 'Contenido'
        },
        hooks: {
          ...config.hooks,
          beforeChange: [categoriesRelationship.hook, populatePermissionSeedsHook],
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
            }
          },
          {
            name: 'title',
            type: 'text',
            localized: true
          },
          {
            name: 'description',
            type: 'textarea',
            localized: true
          },
          {
            name: 'publishedAt',
            label: 'Fecha de publicación',
            required: true,
            type: 'date'
          },
          ...categoriesRelationship.fields,
          ...permissionRelationship(),
          ...config.fields ?? [],
        ]      
    }
}
