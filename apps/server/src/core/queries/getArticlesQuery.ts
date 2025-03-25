'use server'

import { COLLECTION_SLUG_ARTICLE_WEB } from '@/core/collectionsSlugs'
import { getPayload } from '@/payload/utils/getPayload'
import { ArticleWeb } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { generateFilterExpresionFromTags } from 'hegel'
import { withCache } from 'nextjs-query-cache'

const PAGE_SIZE = 40

export type ArticlesQueryResult = {
  results: ArticleWeb[]
  maxPage: number
}

type SortOption = 'publishedAt' | 'popularity'

/**
 * Obtiene artículos filtrados por etiquetas
 */
export const getArticlesQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  limit = PAGE_SIZE,
): Promise<ArticlesQueryResult> => {
  if (tags.length === 0) {
    return getArticlesQuery(page, limit, 'publishedAt', query)
  }

  const filterExpression = generateFilterExpresionFromTags(tags, '&&')
  return getArticlesQuery(page, limit, 'publishedAt', query, filterExpression)
}

/**
 * Busca artículos por IDs con opciones de ordenación
 */
const fetchArticlesById = async (
  articleIds: number[],
  sortBy: SortOption,
  limit: number,
): Promise<ArticleWeb[]> => {
  if (articleIds.length === 0) {
    return []
  }

  const payload = await getPayload()
  // Esta es una corrección: el tipo de 'popularity' debería tener su propia ordenación
  const sort = sortBy === 'publishedAt' ? '-publishedAt' : '-viewCount'

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

/**
 * Obtiene artículos según criterios de búsqueda
 */
export const getArticlesQuery = async (
  page = 0,
  limit = PAGE_SIZE,
  sortBy: SortOption = 'publishedAt',
  query = '',
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

/**
 * Versión cacheada de getArticlesQueryByTags
 */
export const getArticlesQueryByTagsWithCache = withCache(getArticlesQueryByTags)({
  hours: 1,
})

/**
 * Versión cacheada de getArticlesQuery
 */
export const getArticlesQueryWithCache = withCache(getArticlesQuery)({
  hours: 1,
})
