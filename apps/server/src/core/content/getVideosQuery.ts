'use server'

import { COLLECTION_SLUG_VIDEO } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { fetchPermittedContentQuery } from '../auth/permissions/fetchPermittedContentQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { generateFilterExpresionFromTags } from '../domain/getFilterExpressionFromTags'
import { withCache } from 'nextjs-query-cache'

const PAGE_SIZE = 20

export type ResultVideo = Video & {
  allowedHref: string | null
}

export type VideosQueryResult = {
  results: ResultVideo[]
  maxPage: number
}

export const getVideosQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  sortBy: string,
): Promise<VideosQueryResult> => {
  const filterExpression = generateFilterExpresionFromTags(tags, '&&')
  return getVideosQuery(
    page,
    PAGE_SIZE,
    sortBy as 'publishedAt' | 'popularity',
    query,
    filterExpression,
  )
}

const fetchVideosByIds = async (
  videoIds: number[],
  sortBy: 'publishedAt' | 'popularity',
  limit: number,
): Promise<Video[]> => {
  const payload = await getPayload()
  const sort = sortBy === 'publishedAt' ? '-publishedAt' : '-viewCount'

  const videosDocs = await payload.find({
    collection: COLLECTION_SLUG_VIDEO,
    sort,
    pagination: false,
    limit,
    where: {
      id: { in: videoIds },
    },
  })

  return videosDocs.docs
}

const mapVideosWithPermissions = async (videos: Video[]): Promise<ResultVideo[]> => {
  const payload = await getPayload()
  const user = await getCurrentUserQuery(payload)

  return videos.map((video) => {
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
  })
}

export const getVideosQuery = async (
  page: number = 0,
  limit: number = PAGE_SIZE,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  query: string = '',
  filterExpression?: string | null,
): Promise<VideosQueryResult> => {
  const { results, lastPage } = await searchElementsQuery(
    query,
    [COLLECTION_SLUG_VIDEO],
    page,
    filterExpression,
    limit,
  )

  if (results.length === 0) {
    return { results: [], maxPage: lastPage }
  }

  const videoIds = results.map((item) => item.id)
  const videos = await fetchVideosByIds(videoIds, sortBy, limit)
  const videosWithPermissions = await mapVideosWithPermissions(videos)

  return { results: videosWithPermissions, maxPage: lastPage }
}

export const getVideosQueryWithCache = withCache(getVideosQuery)({
  hours: 1,
})

export const getVideosQueryByTagsWithCache = withCache(getVideosQueryByTags)({
  hours: 1,
})
