'use server'

import { COLLECTION_SLUG_QUOTE } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Quote, Taxonomy, Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { evaluateExpression } from 'hegel'
import { withCache } from 'nextjs-query-cache'
import { getSlugsFromTaxonomy } from '../domain/getSlugsFromTaxonomy'
import { generateFilterExpresionFromTags } from '../domain/getFilterExpressionFromTags'
import { fetchPermittedContentQuery } from '../auth/permissions/fetchPermittedContentQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'

const PAGE_SIZE = 20

export type QuotesQueryResult = {
  results: Quote[]
  maxPage: number
}

export type ResultVideo = Video & {
  allowedHref: string | null
}

export const getQuotesQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  filterByCollectionId?: string | null,
): Promise<QuotesQueryResult> => {
  const filterExpression = generateFilterExpresionFromTags(tags, '&&')
  return getQuotesQuery(page, PAGE_SIZE, sortBy, query, filterByCollectionId, filterExpression)
}

const fetchQuotesByIds = async (
  quoteIds: number[],
  sortBy: 'publishedAt' | 'popularity',
): Promise<Quote[]> => {
  const payload = await getPayload()
  const sort = sortBy === 'publishedAt' ? '-createdAt' : '-createdAt'

  const quotesDocs = await payload.find({
    collection: COLLECTION_SLUG_QUOTE,
    sort,
    pagination: false,
    depth: 1,
    where: { id: { in: quoteIds } },
  })

  return quotesDocs.docs
}

const filterQuotesByCollection = (
  quotes: Quote[],
  filterByCollectionId?: string | null,
): Quote[] => {
  if (!filterByCollectionId) return quotes

  return quotes.filter((quote) => {
    const id =
      typeof quote.source?.value === 'number' ? quote.source?.value : String(quote.source?.value.id)
    return id === filterByCollectionId
  })
}

const paginateQuotes = (quotes: Quote[], page: number, pageSize: number): QuotesQueryResult => {
  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize

  return {
    results: quotes.slice(startIndex, endIndex),
    maxPage: Math.ceil(quotes.length / pageSize),
  }
}

export const getQuotesQuery = async (
  page: number = 0,
  pageSize: number = PAGE_SIZE,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  query: string = '',
  filterByCollectionId?: string | null,
  filterExpression?: string | null,
): Promise<QuotesQueryResult> => {
  const { results, lastPage } = await searchElementsQuery(
    query,
    [COLLECTION_SLUG_QUOTE],
    undefined,
    filterExpression,
  )

  if (results.length === 0) {
    return { results: [], maxPage: lastPage }
  }

  const quoteIds = results.map((item) => item.id)
  const quotes = await fetchQuotesByIds(quoteIds, sortBy)
  const filteredQuotes = filterQuotesByCollection(quotes, filterByCollectionId)

  return paginateQuotes(filteredQuotes, page, pageSize)
}

export const getQuotesQueryWithCache = withCache(getQuotesQuery)({
  hours: 1,
})
