import { COLLECTION_SLUG_BOOK, COLLECTION_SLUG_MEDIA } from '@/core/collections-slugs'
import { contentCollectionBuilder } from '@/payload/collections/content/content_collection_builder'
import { slugField } from '@/payload/fields/slug'

export const book = contentCollectionBuilder(
  {
    slug: COLLECTION_SLUG_BOOK,
    labels: {
      singular: 'Libro',
      plural: 'Libros',
    },
    admin: {
      livePreview: {
        url: ({ data }) => `${process.env.NEXT_PUBLIC_SERVER_URL}/biblioteca/${data.slug}`,
      },
    },
    fields: [
      {
        name: 'description',
        type: 'textarea',
        localized: true,
      },
      {
        name: 'cover',
        type: 'upload',
        relationTo: COLLECTION_SLUG_MEDIA,
        hasMany: false,
        required: true,
        filterOptions: {
          mimeType: { contains: 'image' },
        },
      },
      {
        label: 'Contenido',
        name: 'content',
        localized: true,
        type: 'richText',
      },
      ...slugField('title'),
      {
        type: 'array',
        name: 'Ediciones',
        labels: {
          singular: 'Edición',
          plural: 'Ediciones',
        },
        fields: [
          {
            type: 'text',
            name: 'link',
            label: 'Link de compra',
          },
          {
            type: 'select',
            hasMany: false,
            name: 'variant',
            label: 'Variante',
            options: [
              { label: 'Audiolibro', value: 'audiobook' },
              { label: 'Ebook', value: 'ebook' },
              { label: 'Libro', value: 'book' },
            ],
          },
          {
            type: 'select',
            hasMany: false,
            name: 'language',
            label: 'Idioma',
            options: [
              { label: 'Español', value: 'es' },
              { label: 'Inglés', value: 'en' },
            ],
          },
        ],
      },
    ],
  },
  true,
)
