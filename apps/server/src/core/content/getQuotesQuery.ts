'use server'

import { COLLECTION_SLUG_QUOTE } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Quote, Taxonomy, Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { evaluateExpression, withCache } from 'hegel'
import { getSlugsFromTaxonomy } from '../domain/getSlugsFromTaxonomy'
import { generateFilterExpresionFromTags } from '../domain/getFilterExpressionFromTags'

const pageSize = 20

export type ResultVideo = Video & {
  allowedHref: string | null
}

export const getQuotesQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  filterByCollectionId?: string | null,
): Promise<{
  results: Quote[]
  maxPage: number
}> => {
  return getQuotesQuery(
    page,
    pageSize,
    sortBy as 'publishedAt' | 'popularity',
    query,
    filterByCollectionId,
    generateFilterExpresionFromTags(tags, '&&'),
  )
}

export const getQuotesQuery = async (
  page: number = 0,
  maxPage: number = pageSize,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  query: string = '',
  filterByCollectionId?: string | null,
  filterExpression?: string | null,
): Promise<{
  results: Quote[]
  maxPage: number
}> => {
  const { results, lastPage } = await searchElementsQuery(
    query,
    [COLLECTION_SLUG_QUOTE],
    undefined,
    filterExpression,
  )
  if (results.length === 0) return { results: [], maxPage: lastPage }

  const payload = await getPayload()
  const sort = sortBy == 'publishedAt' ? '-createdAt' : '-createdAt'

  const quotesDocs = await payload.find({
    collection: COLLECTION_SLUG_QUOTE,
    sort,
    pagination: false,
    depth: 1,
    where: { id: { in: results.map((item) => item.id) } },
  })

  const quotes = quotesDocs.docs.filter((quote) => {
    if (filterByCollectionId) {
      const id =
        typeof quote.source?.value === 'number'
          ? quote.source?.value
          : String(quote.source?.value.id)
      return id === filterByCollectionId
    }
    return true
  })
  const startIndex = page * maxPage
  const endIndex = startIndex + maxPage

  return {
    results: quotes.slice(startIndex, endIndex),
    maxPage: Math.ceil(quotes.length / maxPage),
  }
}

export const getQuotesQueryWithCache = withCache(getQuotesQuery)
