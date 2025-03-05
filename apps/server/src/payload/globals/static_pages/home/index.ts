import { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
    slug: 'home_page',
    label: 'Página de inicio',
    versions: false,
    fields: [
      {
        name: 'content',
        type: 'richText',
        localized: true
      }
    ],
    admin: {
      livePreview: {
        url: ({ data }) => `/`,
      }  
    }
  }
  