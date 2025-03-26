import { routes } from "@/core/routesGenerator";
import { GlobalConfig } from "payload";

export const ArticulosPage: GlobalConfig = {
    slug: 'articulos_page',
    label: 'Página de artículos',
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
        url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}${routes.nextJS.lecturasPageHref}`,
      }  
    }
  }
  