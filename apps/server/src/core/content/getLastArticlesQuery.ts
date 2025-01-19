import {
  COLLECTION_SLUG_ARTICLE_PDF,
  COLLECTION_SLUG_ARTICLE_WEB,
} from '@/core/infrastructure/payload/collections/config'
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { ArticlePdf, ArticleWeb } from 'payload-types'

type CommonArticle = (ArticlePdf | ArticleWeb) & {
  type: string
  url?: string | null
}

export const getLastArticlesQuery = async (): Promise<CommonArticle[]> => {
  const payload = await getPayload()
  const [articlesPDF, articlesWeb] = await Promise.all([
    payload.find({
      collection: COLLECTION_SLUG_ARTICLE_PDF,
      sort: '-created_at'
    }),
    payload.find({
      collection: COLLECTION_SLUG_ARTICLE_WEB,
      sort: '-created_at'
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

  const articles = [...articlesPDFWithType, ...articlesWebWithType]
    .sort((a, b) => (
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ))

  return articles.slice(0, 3)
}
