import { mockArticles, mockQuotes, mockVideos } from '@/core/mockData'
import { BaseUser } from 'payload-access-control'
import { Product } from 'payload-types'
import { LexicalMocksService } from './mockServices/lexical_mock_service'
import { Services } from './services'

interface ServiceMockBuilderProps {
  children?: React.ReactNode
  user?: BaseUser | null
  products?: Product[]
}

export const ServicesMockBuilder = ({
  children,
  user,
  products,
}: ServiceMockBuilderProps): Services => ({
  LexicalRenderer: () => LexicalMocksService({ children }),
  auth: {
    getCurrentUser: async () => user,
    login: async () => {},
  },
  content: {
    videos: {
      getVideosQueryByTags: async () => ({
        results: mockVideos.map((video) => ({ ...video, allowedHref: null })),
        maxPage: 5,
      }),
    },
    quotes: {
      getQuotes: async () => ({
        results: mockQuotes.map((quote) => ({ ...quote, allowedHref: null })),
        maxPage: 5,
      }),
    },
    articles: {
      getArticlesQueryByTags: async () => ({ results: mockArticles, maxPage: 5 }),
    },
  },
  products: {
    getActiveProducts: async () => products ?? [],
  },
})
