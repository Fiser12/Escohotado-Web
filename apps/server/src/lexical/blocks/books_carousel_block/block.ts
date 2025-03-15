import { Block } from 'payload'
import { booksCarouselBlockSlug } from '../slug_blogs'

export const BooksCarouselBlock: Block = {
  slug: booksCarouselBlockSlug,
  interfaceName: 'BookCarouselBlock',
  labels: {
    singular: 'Carousel de libros',
    plural: 'Carousel de libros',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Título',
      required: true,
    },
    {
      type: 'relationship',
      name: 'books',
      relationTo: 'book',
      required: true,
      hasMany: true,
      admin: {
        allowCreate: false,
        allowEdit: false
      }
    }
  ],
}

