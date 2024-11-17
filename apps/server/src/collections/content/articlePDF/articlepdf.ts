import type { Access, CollectionConfig } from 'payload'
import { addContentHashToFile } from '../../media/addContentHashToFileHook'
import { checkReadPermissions, isAdmin } from '@/utils/access'
import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_MEDIA } from '../../config'
import { taxonomiesRelationshipBuilder } from '@/collections/taxonomy/taxonomiesRelationshipFields'
import { permissionRelationship, populatePermissionSeedsHook } from '@/collections/permissions/permissionsRelationshipFields'

const categoriesRelationship = taxonomiesRelationshipBuilder({
  relationship: { 
    name: 'categories', 
    label: 'Categories'
  },
  seeds: { name: 'seeds', label: 'Semillas de categorías' }
}
)

export const articlePDF: CollectionConfig = {
  slug: COLLECTION_SLUG_ARTICLE_PDF,
  labels: {
    singular: 'Articulo PDF',
    plural: 'Artículos PDF',
  },
  upload: {
    mimeTypes: ['application/pdf'],
  },
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
    beforeChange: [categoriesRelationship.hook, populatePermissionSeedsHook],
    beforeOperation: [addContentHashToFile]
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea'
    },
    {
        name: 'cover',
        type: 'upload',
        relationTo: COLLECTION_SLUG_MEDIA,
        hasMany: false,
        filterOptions: {
          mimeType: { contains: 'image' },
        }
    },
    ...categoriesRelationship.fields,
    ...permissionRelationship()
  ]
}
