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

const pageSize = 40
export type CommonArticle = (ArticlePdf | ArticleWeb) & {
  type: string
  url?: string | null
  hasPermission: boolean
}

export const getArticlesQuery = async (
  query: string,
  autor: string | null,
  medios: string[],
  page: number,
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
  const [articlesPDF, articlesWeb] = await Promise.all([
    payload.find({
      collection: COLLECTION_SLUG_ARTICLE_PDF,
      sort: '-publishedAt',
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
      sort: '-publishedAt',
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
  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize

  const articles = [...articlesPDFWithType, ...articlesWebWithType]
    .sort(
      (a, b) => new Date(b.publishedAt ?? '0').getTime() - new Date(a.publishedAt ?? '0').getTime(),
    )
    .filter((article) => {
      const evalAutorFilter = autor == null || autor == "" || article.categories
        ?.map(cat => cat as Taxonomy)
        ?.some(cat => cat.breadcrumbs?.some(t => t?.url?.includes(autor)))
      const evalMedioFilter =
        medios.length === 0 || medios.every((mediosSeed) => article.categories
        ?.map(cat => cat as Taxonomy)
        ?.some(cat => cat.breadcrumbs?.some(t => t?.url?.includes(mediosSeed)))
      )
      const evalQueryFilter =
        query === null ||
        query.trim() === '' ||
        article.title?.toLowerCase().includes(query.toLowerCase())
      return evalAutorFilter && evalMedioFilter && evalQueryFilter
    })

  return {
    results: articles.slice(startIndex, endIndex),
    maxPage: Math.ceil(articles.length / pageSize),
  }
}
