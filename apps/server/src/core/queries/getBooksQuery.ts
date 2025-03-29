import { getPayload } from '@/payload/utils/getPayload'
import { Book, Media } from 'payload-types'
import { withCache } from 'nextjs-query-cache'
import { COLLECTION_SLUG_BOOK } from '../collectionsSlugs'
import { routes } from '../routesGenerator'


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
