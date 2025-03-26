import { collectionsContentsSlugs } from '@/core/collectionsSlugs'
import { Block } from 'payload'

export const staticQueryBlock: Block = {
  slug: 'staticQueryField',
  labels: {
    singular: 'Consulta estática',
    plural: 'Consultas estáticas',
  },
  fields: [
    {
      type: 'relationship',
      name: 'value',
      relationTo: [...collectionsContentsSlugs],
      required: true,
      hasMany: true,
      admin: {
        allowCreate: false,
      },
    },
  ],
}
