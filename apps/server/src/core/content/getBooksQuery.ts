import { COLLECTION_SLUG_BOOK, routes } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Media } from 'payload-types'

interface BookDto {
  title: string
  coverHref: string
  link: string
}

export const getBooksQuery = async (): Promise<BookDto[]> => {
  const payload = await getPayload()
  const books = await payload.find({
    collection: COLLECTION_SLUG_BOOK,
    sort: '-publishedAt',
    pagination: false
  })

  return books.docs.map((book) => {
    const cover = book.cover as Media | null
    return {
      title: book.title ?? '',
      coverHref: cover?.url ?? '#',
      link: routes.nextJS.generateDetailHref({ collection: COLLECTION_SLUG_BOOK, value: book })
    }
  })
}
