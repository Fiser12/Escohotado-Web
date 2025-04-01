import { loginCommand } from '@/core/commands/login_command'
import { getActiveProducts } from '@/core/queries/getActiveProductsQuery'
import { getArticlesQueryByTags } from '@/core/queries/getArticlesQuery'
import { getCurrentUserQuery } from '@/core/queries/getCurrentUserQuery'
import { getQuotesQueryByTags } from '@/core/queries/getQuotesQuery'
import { getVideosQueryByTags } from '@/core/queries/getVideosQuery'
import { DependencyInjector } from 'hegel/react'
import { BaseUser } from 'payload-access-control'
import { Product } from 'payload-types'
import { LexicalRendererService, RichTextProps } from './lexical/renderer/LexicalRendererService'

export type ServiceInjector = DependencyInjector<Services, 'services'>

export interface Services {
  LexicalRenderer: React.FC<RichTextProps>
  auth: {
    getCurrentUser: () => Promise<BaseUser | undefined | null>
    login: () => Promise<void>
  }
  content: {
    videos: {
      getVideosQueryByTags: typeof getVideosQueryByTags
    }
    quotes: {
      getQuotes: typeof getQuotesQueryByTags
    }
    articles: {
      getArticlesQueryByTags: typeof getArticlesQueryByTags
    }
  }
  products: {
    getActiveProducts: () => Promise<Product[]>
  }
}

export const servicesProd: Services = {
  LexicalRenderer: LexicalRendererService,
  auth: {
    getCurrentUser: getCurrentUserQuery,
    login: loginCommand,
  },
  content: {
    videos: {
      getVideosQueryByTags: getVideosQueryByTags,
    },
    quotes: {
      getQuotes: getQuotesQueryByTags,
    },
    articles: {
      getArticlesQueryByTags: getArticlesQueryByTags,
    },
  },
  products: {
    getActiveProducts: getActiveProducts,
  },
}
