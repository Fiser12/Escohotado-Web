import { Block } from 'payload'

export const mediaQueryBlock: Block = {
  slug: 'mediaQueryField',
  labels: {
    singular: 'Consulta de imágen',
    plural: 'Consultas de imágenes',
},
  fields: [
    {
      type: 'relationship',
      name: 'value',
      relationTo: ['media'],
      required: true,
      hasMany: true,
      admin: {
        allowCreate: false,
      },
    },
  ],
}
