'use server'

import { COLLECTION_SLUG_QUOTE } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { Quote, Taxonomy, Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { evaluateExpression } from 'hegel'
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
  sortBy: string,
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
    generateFilterExpresionFromTags(tags, '&&')
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
  const results = (await searchElementsQuery(query, [COLLECTION_SLUG_QUOTE])).map((item) => item.id)
  const payload = await getPayload()
  const sort = sortBy == 'publishedAt' ? '-createdAt' : '-createdAt'

  const quotesDocs = await payload.find({
    collection: COLLECTION_SLUG_QUOTE,
    sort,
    pagination: false,
    where: { id: { in: results } },
  })

  const quotes = quotesDocs.docs
    .filter((quote) => {
      if (filterByCollectionId) {
        const id =
          typeof quote.source?.value === 'string' ? quote.source?.value : quote.source?.value.id
        return id === filterByCollectionId
      }
      return true
    })
    .filter((quote) => {
      const categories = quote.categories as Taxonomy[] | undefined
      const tags = Array.from(
        new Set(categories?.flatMap(getSlugsFromTaxonomy).filter(Boolean))
      )
      const evalQueryFilter =
        query === null ||
        query.trim() === '' ||
        quote.quote.toLowerCase().includes(query.toLowerCase()) ||
        tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

      return (
        evalQueryFilter && (filterExpression ? evaluateExpression(filterExpression, tags) : true)
      )
    })
  const startIndex = page * maxPage
  const endIndex = startIndex + maxPage

  return {
    results: quotes.slice(startIndex, endIndex),
    maxPage: Math.ceil(quotes.length / maxPage),
  }
}
