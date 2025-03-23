'use server'

import { COLLECTION_SLUG_ARTICLE_WEB } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { ArticleWeb } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { generateFilterExpresionFromTags } from '../domain/getFilterExpressionFromTags'
import { fetchPermittedContentQuery } from '../auth/permissions/fetchPermittedContentQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { withCache } from 'nextjs-query-cache'

const PAGE_SIZE = 40

export type ArticlesQueryResult = {
  results: ArticleWeb[]
  maxPage: number
}

export const getArticlesQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  limit: number = PAGE_SIZE,
): Promise<ArticlesQueryResult> => {
  if (tags.length === 0) {
    return getArticlesQuery(page, limit, 'publishedAt', query)
  }

  const filterExpression = generateFilterExpresionFromTags(tags, '&&')
  return getArticlesQuery(page, limit, 'publishedAt', query, filterExpression)
}

const fetchArticlesById = async (
  articleIds: number[],
  sortBy: 'publishedAt' | 'popularity',
  limit: number,
): Promise<ArticleWeb[]> => {
  const payload = await getPayload()
  const sort = sortBy === 'publishedAt' ? '-publishedAt' : '-publishedAt'

  const articles = await payload.find({
    collection: COLLECTION_SLUG_ARTICLE_WEB,
    sort,
    draft: false,
    pagination: false,
    limit,
    where: {
      id: {
        in: articleIds,
      },
    },
  })

  return articles.docs
}

export const getArticlesQuery = async (
  page: number = 0,
  limit: number = PAGE_SIZE,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  query: string = '',
  filterExpression?: string | null,
): Promise<ArticlesQueryResult> => {
  const { results, lastPage } = await searchElementsQuery(
    query,
    [COLLECTION_SLUG_ARTICLE_WEB],
    page,
    filterExpression,
    limit,
  )

  if (results.length === 0) {
    return { results: [], maxPage: lastPage }
  }

  const articleIds = results.map((result) => result.id)
  const articles = await fetchArticlesById(articleIds, sortBy, limit)

  return { results: articles, maxPage: lastPage }
}

export const getArticlesQueryByTagsWithCache = withCache(getArticlesQueryByTags)({
  hours: 1,
})

export const getArticlesQueryWithCache = withCache(getArticlesQuery)({
  hours: 1,
})
