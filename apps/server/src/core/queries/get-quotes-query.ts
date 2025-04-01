'use server'

import { COLLECTION_SLUG_QUOTE } from '@/core/collections-slugs'
import { getPayload } from '@/payload/utils/get-payload'
import { generateFilterExpresionFromTags } from 'hegel'
import { withCache } from 'nextjs-query-cache'
import { Quote, Video } from 'payload-types'
import { searchElementsQuery } from './search-elements-query'

const PAGE_SIZE = 20

/**
 * Resultado paginado de citas
 */
export type QuotesQueryResult = {
  results: Quote[]
  maxPage: number
}

/**
 * Video con información adicional de permisos
 */
export type ResultVideo = Video & {
  allowedHref: string | null
}

/**
 * Tipos de ordenación disponibles
 */
type SortOption = 'publishedAt' | 'popularity'

/**
 * Obtiene citas filtradas por etiquetas
 */
export const getQuotesQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  sortBy: SortOption = 'publishedAt',
  filterByCollectionId?: string | null,
): Promise<QuotesQueryResult> => {
  const filterExpression = generateFilterExpresionFromTags(tags, '&&')
  return getQuotesQuery(page, PAGE_SIZE, sortBy, query, filterByCollectionId, filterExpression)
}

/**
 * Busca citas por IDs con opciones de ordenación
 */
const fetchQuotesByIds = async (quoteIds: number[], sortBy: SortOption): Promise<Quote[]> => {
  if (quoteIds.length === 0) {
    return []
  }

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

/**
 * Filtra citas por colección específica
 */
const filterQuotesByCollection = (
  quotes: Quote[],
  filterByCollectionId?: string | null,
): Quote[] => {
  if (!filterByCollectionId) return quotes
  if (quotes.length === 0) return []

  return quotes.filter((quote) => {
    const id =
      typeof quote.source?.value === 'number' ? quote.source?.value : String(quote.source?.value.id)
    return id === filterByCollectionId
  })
}

/**
 * Pagina una lista de citas
 */
const paginateQuotes = (quotes: Quote[], page: number, pageSize: number): QuotesQueryResult => {
  if (quotes.length === 0) {
    return { results: [], maxPage: 0 }
  }

  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize

  return {
    results: quotes.slice(startIndex, endIndex),
    maxPage: Math.ceil(quotes.length / pageSize),
  }
}

/**
 * Obtiene citas según criterios de búsqueda
 */
export const getQuotesQuery = async (
  page = 0,
  pageSize = PAGE_SIZE,
  sortBy: SortOption = 'publishedAt',
  query = '',
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

/**
 * Versión cacheada de getQuotesQuery
 */
export const getQuotesQueryWithCache = withCache(getQuotesQuery)({
  hours: 1,
})
