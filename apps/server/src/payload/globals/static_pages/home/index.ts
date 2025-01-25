import { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
    slug: 'home_page',
    label: 'Página de inicio',
    versions: false,
    fields: [
      {
        name: 'content',
        type: 'richText',
      }
    ],
    admin: {
      livePreview: {
        url: ({ data }) => `/`,
      }  
    }
  }
  