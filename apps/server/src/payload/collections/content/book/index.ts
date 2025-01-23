import { slugField } from '@/payload/fields/slug'
import { COLLECTION_SLUG_BOOK } from '../../config'
import { contentCollectionBuilder } from '../content_collection_builder'

export const book = contentCollectionBuilder({
  slug: COLLECTION_SLUG_BOOK,
  labels: {
    singular: 'Libro',
    plural: 'Libros',
  },
  fields: [
    {
      label: 'Contenido',
      name: 'content',
      type: 'richText',
    },
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
    }
  ]
})
