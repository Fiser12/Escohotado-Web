'use server'

import { COLLECTION_SLUG_VIDEO } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { fetchPermittedContentQuery } from '../auth/permissions/fetchPermittedContentQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { generateFilterExpresionFromTags } from 'hegel'
import { withCache } from 'nextjs-query-cache'

const PAGE_SIZE = 20

/**
 * Video con información adicional sobre permisos
 */
export type ResultVideo = Video & {
  allowedHref: string | null
}

/**
 * Resultado paginado de videos
 */
export type VideosQueryResult = {
  results: ResultVideo[]
  maxPage: number
}

/**
 * Tipos de ordenación disponibles
 */
type SortOption = 'publishedAt' | 'popularity'

/**
 * Obtiene videos filtrados por etiquetas
 */
export const getVideosQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  sortBy: string,
): Promise<VideosQueryResult> => {
  const filterExpression = generateFilterExpresionFromTags(tags, '&&')
  return getVideosQuery(page, PAGE_SIZE, sortBy as SortOption, query, filterExpression)
}

/**
 * Busca videos por IDs con opciones de ordenación
 */
const fetchVideosByIds = async (
  videoIds: number[],
  sortBy: SortOption,
  limit: number,
): Promise<Video[]> => {
  if (videoIds.length === 0) {
    return []
  }

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

/**
 * Añade información de permisos a los videos
 */
const mapVideosWithPermissions = async (videos: Video[]): Promise<ResultVideo[]> => {
  if (videos.length === 0) {
    return []
  }

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

/**
 * Obtiene videos según criterios de búsqueda
 */
export const getVideosQuery = async (
  page = 0,
  limit = PAGE_SIZE,
  sortBy: SortOption = 'publishedAt',
  query = '',
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

/**
 * Versión cacheada de getVideosQuery
 */
export const getVideosQueryWithCache = withCache(getVideosQuery)({
  hours: 1,
})

/**
 * Versión cacheada de getVideosQueryByTags
 */
export const getVideosQueryByTagsWithCache = withCache(getVideosQueryByTags)({
  hours: 1,
})
