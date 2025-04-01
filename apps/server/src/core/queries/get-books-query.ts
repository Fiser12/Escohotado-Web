import { getPayload } from '@/payload/utils/get-payload'
import { withCache } from 'nextjs-query-cache'
import { Book } from 'payload-types'
import { COLLECTION_SLUG_BOOK } from '../collections-slugs'

export const getBooksQuery = async (): Promise<Book[]> => {
  const payload = await getPayload()
  const books = await payload.find({
    collection: COLLECTION_SLUG_BOOK,
    sort: '-publishedAt',
    pagination: false,
  })

  return books.docs
}
export const getBooksQueryWithCache = withCache(getBooksQuery)({
  days: 1,
})
