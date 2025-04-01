import { COLLECTION_SLUG_PDF } from '@/core/collections-slugs'
import { addContentHashToFile } from '@/payload/hooks/media/addContentHashToFileHook'
import { CollectionConfig } from 'payload'
import {
  cachePermissionSeedsHook,
  checkReadPermissions,
  isAdmin,
  permissionRelationship,
} from 'payload-access-control'

export const pdf: CollectionConfig = {
  slug: COLLECTION_SLUG_PDF,
  labels: {
    singular: 'PDF',
    plural: 'PDFs',
  },
  access: {
    read: checkReadPermissions,
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
    beforeChange: [cachePermissionSeedsHook()],
  },
  fields: [
    {
      label: 'Título',
      name: 'title',
      type: 'text',
      required: true,
    },
    ...permissionRelationship(),
  ],
}
