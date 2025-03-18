'use server'
import { COLLECTION_SLUG_ARTICLE_WEB } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { ArticleWeb } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { generateFilterExpresionFromTags } from '../domain/getFilterExpressionFromTags'

const pageSize = 40

export const getArticlesQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  limit: number = pageSize,
): Promise<{
  results: ArticleWeb[]
  maxPage: number
}> => {
  if (tags.length === 0) {
    return getArticlesQuery(page, limit, 'publishedAt', query)
  }
  return getArticlesQuery(
    page, 
    limit, 
    'publishedAt', 
    query, 
    generateFilterExpresionFromTags(tags, '&&')
  )
}

export const getArticlesQuery = async (
  page: number = 0,
  limit: number = pageSize,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  query: string = '',
  filterExpression?: string | null,
): Promise<{
  results: ArticleWeb[]
  maxPage: number
}> => {
  const { results, lastPage } = await searchElementsQuery(
    query, 
    [COLLECTION_SLUG_ARTICLE_WEB],
    page, 
    filterExpression,
    limit
  )
  if (results.length === 0) return { results: [], maxPage: lastPage }

  const payload = await getPayload()

  const sort = sortBy == 'publishedAt' ? '-publishedAt' : '-publishedAt'
  const articles = await payload.find({
    collection: COLLECTION_SLUG_ARTICLE_WEB,
    sort,
    draft: false,
    pagination: false,
    limit,
    where: {
      id: {
        in: results.map((result) => result.id),
      }
    }
  })

  return { results: articles.docs, maxPage: lastPage }
}
