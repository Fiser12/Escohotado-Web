import { slugField } from '@/payload/fields/slug'
import { COLLECTION_SLUG_BOOK } from 'hegel/payload'
import { contentCollectionBuilder } from '../content_collection_builder'
import { quotesJoinField } from '@/payload/fields/quotesJoin/quotesJoinField'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

export const book = contentCollectionBuilder({
  slug: COLLECTION_SLUG_BOOK,
  labels: {
    singular: 'Libro',
    plural: 'Libros',
  },
  admin: {
    livePreview: {
      url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/biblioteca/${data.slug}`,
    }  
  },
  fields: [
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
    },
    lexicalHTML('content', { name: 'content_html' }),
    ...slugField("title"),
    {
      type: "array",
      name: "Ediciones",
      labels: {
        singular: "Edición",
        plural: "Ediciones"
      },
      fields: [
        {
          type: "text",
          name: "link",
          label: "Link de compra"
        },
        {
          type: "select",
          hasMany: false,
          name: "variant",
          label: "Variante",
          options: [
            { label: "Audiolibro", value: "audiobook" },
            { label: "Ebook", value: "ebook" },
            { label: "Libro", value: "book" },
          ]
        },
        {
          type: "select",
          hasMany: false,
          name: "language",
          label: "Idioma",
          options: [
            { label: "Español", value: "es" },
            { label: "Inglés", value: "en" },
          ]
        }
      ]
    },
    quotesJoinField
  ]
})
