import { COLLECTION_SLUG_PDF } from '@/core/collectionsSlugs'
import { addContentHashToFile } from '../../../hooks/media/addContentHashToFileHook'
import { CollectionConfig } from 'payload'
import { checkReadPermissions, isAdmin } from 'payload-access-control'
import {
  cachePermissionSeedsHook,
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
    group: 'Contenido'
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
      required: true
    },
    ...permissionRelationship(),
  ],
}
