import { CollectionConfig } from 'payload'
import { isAnyone, isAdmin } from '../../fields/permissions/accessEvaluations'
import { COLLECTION_SLUG_UI_BLOCK } from '../config'

export const uiBLock: CollectionConfig = {
  slug: COLLECTION_SLUG_UI_BLOCK,
  labels: {
    singular: 'Bloque',
    plural: 'Bloques',
  },
  admin: {
    group: 'UI',
    useAsTitle: 'title',
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
        type: 'text',
        name: 'title',
        label: 'Título',
        required: true
    },
    {
        type: 'richText',
        name: 'block',
        label: 'Bloque',
        required: true
    }
  ],
}
