import { COLLECTION_SLUG_UI_GRID_CARDS } from "@/core/infrastructure/payload/collections/config";
import { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
    slug: 'home_page',
    label: 'Página de inicio',
    versions: false,
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
        name: "cards",
        type: 'relationship',
        relationTo: COLLECTION_SLUG_UI_GRID_CARDS,
        hasMany: true
      }
    ]
  }
  