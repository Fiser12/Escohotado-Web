import { GlobalConfig } from "payload";

export const VideosPage: GlobalConfig = {
    slug: 'videos_page',
    label: 'Página de vídeos',
    versions: false,
    fields: [
      {
        name: 'content',
        type: 'richText',
      }
    ],
    admin: {
      livePreview: {
        url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/videos`,
      }  
    }
  }
  