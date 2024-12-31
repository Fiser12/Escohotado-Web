import { COLLECTION_SLUG_BOOK } from '@/core/infrastructure/payload/collections/config'
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { Book, Media } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'

interface BookDto {
  title: string
  coverHref: string
  link: string
}

export const getBooksQuery = async (query: string, page: number): Promise<BookDto[]> => {
  const results = (await searchElementsQuery(query, [COLLECTION_SLUG_BOOK])).map((item) => item.id)
  const payload = await getPayload()
  const books = await payload.find({
    collection: COLLECTION_SLUG_BOOK,
    sort: '-publishedAt',
    where: {
      id: { in: results },
    },
  })
  
  return books.docs.map((book) => {
    const cover = book.cover as Media | null
    return {
      title: book.title ?? "",
      coverHref: cover?.url ?? "#",
      link: `/biblioteca/${book.slug}`,
    }
})
}
