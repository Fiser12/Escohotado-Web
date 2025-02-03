'use server'
import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { ArticlePdf, ArticleWeb, Book, Taxonomy } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { evaluateExpression } from 'hegel'
import { getSlugsFromTaxonomy } from '../domain/getSlugsFromTaxonomy'
import { generateFilterExpresionFromTags } from '../domain/getFilterExpressionFromTags'

const pageSize = 40
export type CommonArticle = (ArticlePdf | ArticleWeb) & {
  type: string
}

export const getArticlesQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  limit: number = pageSize,
): Promise<{
  results: CommonArticle[]
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
  results: CommonArticle[]
  maxPage: number
}> => {
  const { results, lastPage } = await searchElementsQuery(
    query, 
    [COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB],
    page, 
    filterExpression,
    limit
  )
  if (results.length === 0) return { results: [], maxPage: lastPage }

  const payload = await getPayload()

  const sort = sortBy == 'publishedAt' ? '-publishedAt' : '-publishedAt'
  const [articlesPDF, articlesWeb] = await Promise.all([
    payload.find({
      collection: COLLECTION_SLUG_ARTICLE_PDF,
      sort,
      pagination: false,
      where: {
        id: {
          in: results
            .filter((result) => result.collection === COLLECTION_SLUG_ARTICLE_PDF)
            .map((result) => result.id),
        },
      },
    }),
    payload.find({
      collection: COLLECTION_SLUG_ARTICLE_WEB,
      sort,
      pagination: false,
      where: {
        id: {
          in: results
            .filter((result) => result.collection === COLLECTION_SLUG_ARTICLE_WEB)
            .map((result) => result.id),
        },
      },
    }),
  ])

  const articlesPDFWithType = articlesPDF.docs.map((article) => ({
    ...article,
    type: COLLECTION_SLUG_ARTICLE_PDF
  }))
  const articlesWebWithType = articlesWeb.docs.map((article) => ({
    ...article,
    type: COLLECTION_SLUG_ARTICLE_WEB
  }))

  const articles = [...articlesPDFWithType, ...articlesWebWithType]
    .sort((a, b) => 
      new Date(b.publishedAt ?? '0').getTime() - new Date(a.publishedAt ?? '0').getTime()
    )

  return { results: articles, maxPage: lastPage }
}
