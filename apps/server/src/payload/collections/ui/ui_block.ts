import { COLLECTION_SLUG_UI_BLOCK } from '@/core/collections-slugs'
import { CollectionConfig } from 'payload'
import { isAdmin, isAnyone } from 'payload-access-control'

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
      required: true,
    },
    {
      type: 'richText',
      localized: true,
      name: 'block',
      label: 'Bloque',
      required: true,
    },
  ],
}
