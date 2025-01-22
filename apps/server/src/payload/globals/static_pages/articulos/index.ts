import { GlobalConfig } from "payload";

export const ArticulosPage: GlobalConfig = {
    slug: 'articulos_page',
    label: 'Página de artículos',
    versions: false,
    fields: [
      {
        name: 'content',
        type: 'richText',
        required: true
      }
    ]
  }
  