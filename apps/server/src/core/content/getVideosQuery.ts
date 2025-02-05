'use server'
import { COLLECTION_SLUG_VIDEO } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Taxonomy, Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { fetchPermittedContentQuery } from '../auth/permissions/fetchPermittedContentQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { evaluateExpression } from 'hegel'
import { getSlugsFromTaxonomy } from '../domain/getSlugsFromTaxonomy'
import { generateFilterExpresionFromTags } from '../domain/getFilterExpressionFromTags'

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
  return getVideosQuery(
    page,
    pageSize,
    sortBy as 'publishedAt' | 'popularity',
    query,
    generateFilterExpresionFromTags(tags, '&&'),
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
        new Set<string>(categories?.flatMap(getSlugsFromTaxonomy).filter(Boolean))
      )
      const youtubeTags = (video.tags ?? []) as string[]
      const tags = [...categoriesTags, ...youtubeTags]

      return filterExpression ? evaluateExpression(filterExpression, tags) : true
      
    })

  const startIndex = page * maxPage
  const endIndex = startIndex + maxPage

  return {
    results: videos.slice(startIndex, endIndex),
    maxPage: Math.ceil(videos.length / maxPage),
  }
}
