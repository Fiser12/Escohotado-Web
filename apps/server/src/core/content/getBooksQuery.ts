import { COLLECTION_SLUG_BOOK, routes } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Media } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'

interface BookDto {
  title: string
  coverHref: string
  link: string
}

export const getBooksQuery = async (query: string): Promise<BookDto[]> => {
  const { results } = await searchElementsQuery(query, [COLLECTION_SLUG_BOOK])
  const payload = await getPayload()
  const books = await payload.find({
    collection: COLLECTION_SLUG_BOOK,
    sort: '-publishedAt',
    pagination: false,
    where: {
      id: { in: results.map((item) => item.id) },
    },
  })

  return books.docs.map((book) => {
    const cover = book.cover as Media | null
    return {
      title: book.title ?? '',
      coverHref: cover?.url ?? '#',
      link: routes.generateDetailHref({ collection: COLLECTION_SLUG_BOOK, value: book })
    }
  })
}
