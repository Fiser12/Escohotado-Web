import { loginCommand } from '@/core/commands/login-command'
import { getActiveProducts } from '@/core/queries/get-active-products-query'
import { getArticlesQueryByTags } from '@/core/queries/get-articles-query'
import { getCurrentUserQuery } from '@/core/queries/get-current-user-query'
import { getQuotesQueryByTags } from '@/core/queries/get-quotes-query'
import { getVideosQueryByTags } from '@/core/queries/get-videos-query'
import { DependencyInjector } from 'hegel/react'
import { BaseUser } from 'payload-access-control'
import { Product } from 'payload-types'
import { LexicalRendererService, RichTextProps } from './lexical/renderer/lexical-renderer-service'
import { unlockItemForUser } from 'payload-stripe-inventory/server'

export type ServiceInjector = DependencyInjector<Services, 'services'>

export interface Services {
  LexicalRenderer: React.FC<RichTextProps>
  auth: {
    unlockItemForUser: typeof unlockItemForUser
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
    unlockItemForUser: unlockItemForUser,
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
