import { CollectionConfig } from 'payload'
import { isAnyone, isAdmin } from 'payload-access-control'
import { COLLECTION_SLUG_UI_BLOCK } from 'hegel/payload'

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
        localized: true,
        name: 'block',
        label: 'Bloque',
        required: true
    }
  ],
}
