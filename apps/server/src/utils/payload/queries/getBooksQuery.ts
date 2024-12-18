import { COLLECTION_SLUG_BOOK } from '@/collections/config'
import { getPayload } from '@/utils/payload'
import { Book } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'

export const getBooksQuery = async (
  query: string,
  page: number,
): Promise<Book[]> => {
  const results = (await searchElementsQuery(query, [COLLECTION_SLUG_BOOK])).map((item) => item.id)
  const payload = await getPayload()
  const books = await payload.find({
    collection: COLLECTION_SLUG_BOOK,
    sort: '-publishedAt',
    where: {
      id: { in: results },
    },
  })

  return books.docs
}
