'use server'
import { COLLECTION_SLUG_VIDEO } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Taxonomy, Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { fetchPermittedContentQuery } from '../auth/permissions/fetchPermittedContentQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { evaluateExpression } from 'hegel'
import { getSlugsFromTaxonomy } from '../domain/getSlugsFromTaxonomy'

const pageSize = 20

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
  const filterExpression = tags.length !== 0 ? tags.map((tag) => `"${tag}"`).join(' || ') : null
  return getVideosQuery(
    page,
    pageSize,
    sortBy as 'publishedAt' | 'popularity',
    query,
    filterExpression,
  )
}

export const getVideosQuery = async (
  page: number = 0,
  maxPage: number = pageSize,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  query: string = '',
  filterExpression?: string | null,
): Promise<{
  results: ResultVideo[]
  maxPage: number
}> => {
  const results = (await searchElementsQuery(query, [COLLECTION_SLUG_VIDEO])).map((item) => item.id)
  const payload = await getPayload()
  const user = await getCurrentUserQuery(payload)
  const sort = sortBy == 'publishedAt' ? '-publishedAt' : '-viewCount'
  const videosDocs = await payload.find({
    collection: COLLECTION_SLUG_VIDEO,
    sort,
    pagination: false,
    where: {
      id: { in: results },
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
    })
    .filter((video) => {
      const categories = video.categories as Taxonomy[] | undefined
      const categoriesTags = Array.from(
        new Set<string>(
          categories?.flatMap((category) => getSlugsFromTaxonomy(category)).filter(Boolean),
        ),
      )
      const youtubeTags = (video.tags ?? []) as string[]
      const tags = [...categoriesTags, ...youtubeTags]
      const evalQueryFilter =
        query === null ||
        query.trim() === '' ||
        video.title?.toLowerCase().includes(query.toLowerCase()) ||
        tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

      return (
        evalQueryFilter && (filterExpression ? evaluateExpression(filterExpression, tags) : true)
      )
    })

  const startIndex = page * maxPage
  const endIndex = startIndex + maxPage

  return {
    results: videos.slice(startIndex, endIndex),
    maxPage: Math.ceil(videos.length / maxPage),
  }
}
