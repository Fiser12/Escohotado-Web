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
      relationTo: ['article_web', 'article_pdf', 'book', 'video', 'quote', 'media'],
      required: true,
      hasMany: true,
      admin: {
        allowCreate: false,
      },
    },
  ],
}
