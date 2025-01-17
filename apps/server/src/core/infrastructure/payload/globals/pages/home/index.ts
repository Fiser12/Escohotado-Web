import { COLLECTION_SLUG_MEDIA } from "@/core/infrastructure/payload/collections/config";
import { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
    slug: 'home_page',
    label: 'Página de inicio',
    versions: true,
    fields: [
      {
        label: 'Hero panel',
        name: 'hero',
        type: 'group',
        fields: [
          {
            label: 'Descripción',
            name: 'description',
            type: 'textarea',
            localized: true,
          },
          {
            type: 'array',
            name: 'buttons',
            fields: [
              {
                label: 'Título del botón',
                name: 'title',
                type: 'text',
                required: true,
                localized: true,
              },
              {
                label: 'Enlace del botón',
                name: 'link',
                type: 'text',
                localized: true,
                required: true
              }
            ]
          }
        ]
      },
      {
        type: 'text',
        name: 'tailwindGridClassNames',
        label: 'Clases de Tailwind del grid',
        defaultValue: "grid-cols-1 md:grid-cols-4"
      },
      {
        type: 'array',
        name: 'cards',
        fields: [
          {
            type: 'relationship',
            name: 'value',
            relationTo: ['article_web', 'article_pdf', 'book', 'video'],
            required: true,
            hasMany: false,
            admin: {
              allowCreate: false
            }   
          },
          {
            type: 'text',
            name: 'tailwindClassNames',
            label: 'Clases de Tailwind del card'
          }
        ]
      }
    ]
  }
  