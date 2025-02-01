'use server'
import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB } from 'hegel/payload'
import { getPayload } from '@/payload/utils/getPayload'
import { ArticlePdf, ArticleWeb, Book, Taxonomy } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { evalPermissionQuery } from '../auth/permissions/evalPermissionQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { evaluateExpression } from 'hegel'
import { getSlugsFromTaxonomy } from '../domain/getSlugsFromTaxonomy'
import { generateFilterExpresionFromTags } from '../domain/getFilterExpressionFromTags'

const pageSize = 40
export type CommonArticle = (ArticlePdf | ArticleWeb) & {
  type: string
  url?: string | null
  hasPermission: boolean
}

export const getArticlesQueryByTags = async (
  query: string,
  tags: string[],
  page: number,
  maxPage: number = pageSize,
): Promise<{
  results: CommonArticle[]
  maxPage: number
}> => {
  if (tags.length === 0) {
    return getArticlesQuery(page, maxPage, 'publishedAt', query)
  }
  return getArticlesQuery(
    page, 
    maxPage, 
    'publishedAt', 
    query, 
    generateFilterExpresionFromTags(tags, '&&')
  )
}

export const getArticlesQuery = async (
  page: number = 0,
  maxPage: number = pageSize,
  sortBy: 'publishedAt' | 'popularity' = 'publishedAt',
  query: string = '',
  filterExpression?: string | null,
): Promise<{
  results: CommonArticle[]
  maxPage: number
}> => {
  const results = await searchElementsQuery(query, [
    COLLECTION_SLUG_ARTICLE_PDF,
    COLLECTION_SLUG_ARTICLE_WEB,
  ])
  const payload = await getPayload()
  const user = await getCurrentUserQuery(payload)
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
    type: COLLECTION_SLUG_ARTICLE_PDF,
    hasPermission: evalPermissionQuery(user, article.permissions_seeds?.trim() ?? ''),
  }))
  const articlesWebWithType = articlesWeb.docs.map((article) => ({
    ...article,
    type: COLLECTION_SLUG_ARTICLE_WEB,
    url: `/articulos/${article.slug}`,
    hasPermission: evalPermissionQuery(user, article.permissions_seeds?.trim() ?? ''),
  }))

  const articles = [...articlesPDFWithType, ...articlesWebWithType]
    .sort(
      (a, b) => new Date(b.publishedAt ?? '0').getTime() - new Date(a.publishedAt ?? '0').getTime(),
    )
    .filter((article) => {
      const categories = article.categories as Taxonomy[] | undefined
      const tags = Array.from(
        new Set(categories?.flatMap(getSlugsFromTaxonomy).filter(Boolean))
      )
      const evalQueryFilter =
        query === null ||
        query.trim() === '' ||
        article.title?.toLowerCase().includes(query.toLowerCase()) ||
        tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))

      return (
        evalQueryFilter && (filterExpression ? evaluateExpression(filterExpression, tags) : true)
      )
    })
  const startIndex = page * maxPage
  const endIndex = startIndex + maxPage

  return {
    results: articles.slice(startIndex, endIndex),
    maxPage: Math.ceil(articles.length / maxPage),
  }
}
