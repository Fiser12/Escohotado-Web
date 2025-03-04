import { slugField } from '@/payload/fields/slug'
import { COLLECTION_SLUG_ARTICLE_WEB, routes } from 'hegel/payload'
import { contentWithPermissionsCollectionBuilder } from '../content_collection_builder'
import { quotesJoinField } from '@/payload/fields/quotesJoin/quotesJoinField'
import { defaultLexical } from '@/lexical/defaultLexical'

export const articleWeb = contentWithPermissionsCollectionBuilder({
  slug: COLLECTION_SLUG_ARTICLE_WEB,
  
  labels: {
    singular: 'Articulo Web',
    plural: 'Artículos Web',
  },
  admin: {
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}${routes.nextJS.generateDetailHref({ 
        collection: COLLECTION_SLUG_ARTICLE_WEB, 
        value: { id: data.id, slug: data.slug } 
      })}`,
    }
  },
  versions: {
    drafts: true
  },
  hooks: {
    beforeRead: [
      async ({ doc }) => {
        return {
          ...doc,
          locales: Object.keys(doc.content || [])
        }
      }   
    ]
  },
  fields: [
    ...slugField("title"),
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
      localized: true,
      editor: defaultLexical
    },
    {
      label: 'Fuente',
      name: 'source',
      localized: true,
      type: 'text',
    },
    {
      name: 'preview_content',
      localized: true,
      type: 'richText',
      label: 'Contenido de vista previa'
    },
    quotesJoinField,
  ]
}, true)
