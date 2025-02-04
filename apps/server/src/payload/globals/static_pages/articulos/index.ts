import { routes } from "hegel";
import { GlobalConfig } from "payload";

export const ArticulosPage: GlobalConfig = {
    slug: 'articulos_page',
    label: 'Página de artículos',
    versions: false,
    fields: [
      {
        name: 'content',
        type: 'richText',
      }
    ],
    admin: {
      livePreview: {
        url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}${routes.lecturasPageHref}`,
      }  
    }
  }
  