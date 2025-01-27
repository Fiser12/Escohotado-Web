'use server'
import {
  COLLECTION_SLUG_ARTICLE_PDF,
  COLLECTION_SLUG_ARTICLE_WEB,
} from '@/payload/collections/config'
import { getPayload } from '@/payload/utils/getPayload'
import { ArticlePdf, ArticleWeb, Book, Taxonomy } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { evalPermissionQuery } from '../auth/permissions/evalPermissionQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { evaluateExpression } from 'hegel'
import { getSlugsFromTaxonomy } from '../domain/getSlugsFromTaxonomy'

const pageSize = 40
export type CommonArticle = (ArticlePdf | ArticleWeb) & {
  type: string
  url?: string | null
  hasPermission: boolean
}

export const getArticlesQueryByMediasAndAuthor = async (
  query: string,
  autor: string | null,
  medios: string[],
  page: number,
  maxPage: number = pageSize,
): Promise<{
  results: CommonArticle[]
  maxPage: number
}> => {
  if (medios.length === 0 && !autor) {
    return getArticlesQuery(page, maxPage, 'publishedAt', query)
  }
  if (autor && medios.length === 0) {
    return getArticlesQuery(page, maxPage, 'publishedAt', query, `"${autor}"`)
  }
  if (!autor && medios.length !== 0) {
    return getArticlesQuery(
      page,
      maxPage,
      'publishedAt',
      query,
      medios.map((medio) => `"${medio}"`).join(' && '),
    )
  }
  const filterExpression = `"${autor || true}" || (${medios.map((medio) => `"${medio}"`).join(' && ')})`
  return getArticlesQuery(page, maxPage, 'publishedAt', query, filterExpression)
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
      if (!categories) {
        return true
      }
      const tags = Array.from(
        new Set<string>(
          categories.flatMap((category) => getSlugsFromTaxonomy(category)).filter(Boolean),
        ),
      )

      const evalQueryFilter =
        query === null ||
        query.trim() === '' ||
        article.title?.toLowerCase().includes(query.toLowerCase())
      return evalQueryFilter && filterExpression ? evaluateExpression(filterExpression, tags) : true
    })
  const startIndex = page * maxPage
  const endIndex = startIndex + maxPage

  return {
    results: articles.slice(startIndex, endIndex),
    maxPage: Math.ceil(articles.length / maxPage),
  }
}
