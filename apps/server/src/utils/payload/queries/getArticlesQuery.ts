import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB } from '@/collections/config'
import { getPayload } from '@/utils/payload'
import { ArticlePdf, ArticleWeb, Book } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'

const pageSize = 20
type CommonArticle = (ArticlePdf | ArticleWeb) & {
  type: string
  url?: string | null
}

export const getArticlesQuery = async (
  query: string,
  autor: string | null,
  temas: string[],
  page: number,
): Promise<{
  results: CommonArticle[]
  maxPage: number
}> => {
  const results = await searchElementsQuery(
    query, 
    [COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB]
  )

  const payload = await getPayload()
  const [articlesPDF, articlesWeb] = await Promise.all([
    payload.find({
      collection: COLLECTION_SLUG_ARTICLE_PDF,
      sort: '-publishedAt',
      where: {
        id: { in: results
            .filter((result) => result.collection === COLLECTION_SLUG_ARTICLE_PDF)
            .map((result) => result.id) 
        },
      },
    }),
    payload.find({
      collection: COLLECTION_SLUG_ARTICLE_WEB,
      sort: '-publishedAt',
      where: {
        id: { in: results
            .filter((result) => result.collection === COLLECTION_SLUG_ARTICLE_WEB)
            .map((result) => result.id) 
        },
      },
    }),
  ])
  
  const articlesPDFWithType = articlesPDF.docs.map((article) => ({
    ...article,
    type: COLLECTION_SLUG_ARTICLE_PDF,
  }))

  const articlesWebWithType = articlesWeb.docs.map((article) => ({
    ...article,
    type: COLLECTION_SLUG_ARTICLE_WEB,
    url: `/articulos/${article.slug}`,
  }))
  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize

  const articles = [...articlesPDFWithType, ...articlesWebWithType]
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt).getTime()
      const dateB = new Date(b.publishedAt).getTime()
      return dateB - dateA
    })
    .filter((article) => {
      const evalAutorFilter = autor === null || article.seeds?.includes(autor)
      const evalTemaFilter =
        temas.length === 0 || temas.every((seed) => article.seeds?.includes(seed))
      const evalQueryFilter =
        query === null ||
        query.trim() === '' ||
        article.title?.toLowerCase().includes(query.toLowerCase())
      return evalAutorFilter && evalTemaFilter && evalQueryFilter
    })

  return {
    results: articles.slice(startIndex, endIndex),
    maxPage: Math.ceil(articles.length / pageSize),
  }
}
