import { mockArticles, mockQuotes, mockVideos } from '@/core/mock-data'
import { BaseUser } from 'payload-access-control'
import { ArticleWeb, Product, Quote, Video } from 'payload-types'
import { LexicalMocksService } from './mock-services/lexical-mock-service'
import { Services } from './services'

interface ServiceMockBuilderProps {
  children?: React.ReactNode
  user?: BaseUser | null
  products?: Product[]
  listVideos?: Video[]
  listQuotes?: Quote[]
  listArticles?: ArticleWeb[]
}

export const ServicesMockBuilder = ({
  children = <div>Mock</div>,
  user,
  products,
  listVideos = mockVideos,
  listQuotes = mockQuotes,
  listArticles = mockArticles,
}: ServiceMockBuilderProps = {}): Services => ({
  LexicalRenderer: () => LexicalMocksService({ children }),
  auth: {
    getCurrentUser: async () => user,
    login: async () => { },
  },
  content: {
    videos: {
      getVideosQueryByTags: async () => ({
        results: listVideos.map((video) => ({ ...video, allowedHref: null })),
        maxPage: 5,
      }),
    },
    quotes: {
      getQuotes: async () => ({
        results: listQuotes.map((quote) => ({ ...quote, allowedHref: null })),
        maxPage: 5,
      }),
    },
    articles: {
      getArticlesQueryByTags: async () => ({ results: listArticles, maxPage: 5 }),
    },
  },
  products: {
    getActiveProducts: async () => products ?? [],
  },
})
