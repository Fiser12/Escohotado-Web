'use server'
import { COLLECTION_SLUG_VIDEO } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { fetchPermittedContentQuery } from '../auth/permissions/fetchPermittedContentQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { generateFilterExpresionFromTags } from '../domain/getFilterExpressionFromTags'

const limit = 20

export type ResultVideo = Video & {
  allowedHref: string | null
}

export const getVideosQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  sortBy: string,
): Promise<{
  results: ResultVideo[]
  maxPage: number
}> => {
  return getVideosQuery(
    page,
    limit,
    sortBy as 'publishedAt' | 'popularity',
    query,
    generateFilterExpresionFromTags(tags, '&&'),
  )
}

export const getVideosQuery = async (
  page: number = 0,
  limit: number,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  query: string = '',
  filterExpression?: string | null,
): Promise<{
  results: ResultVideo[]
  maxPage: number
}> => {
  const { results, lastPage } = await searchElementsQuery(
    query, 
    [COLLECTION_SLUG_VIDEO], 
    page,
    filterExpression, 
    limit
  )
  if (results.length === 0) return { results: [], maxPage: lastPage }

  const payload = await getPayload()
  const user = await getCurrentUserQuery(payload)
  const sort = sortBy == 'publishedAt' ? '-publishedAt' : '-viewCount'
  const videosDocs = await payload.find({
    collection: COLLECTION_SLUG_VIDEO,
    sort,
    pagination: false,
    limit,
    where: {
      id: { in: results.map(item => item.id) },
    },
  })

  const videos = videosDocs.docs
    .map((video) => {
      const allowedHref = fetchPermittedContentQuery(
        user,
        video.permissions_seeds ?? '',
        video.url,
        video.url_free,
      )

      return {
        ...video,
        allowedHref,
      }
    }
  )

  return { results: videos, maxPage: lastPage }
}
