import { DependencyInjector } from 'hegel/react'
import { LexicalRendererService, RichTextProps } from './lexical/renderer/LexicalRendererService'
import { LexicalMocksService } from './mockServices/lexical_mock_service'
import { BaseUser } from 'payload-access-control'
import { getCurrentUserQuery } from '@/core/queries/getCurrentUserQuery'
import { Product } from 'payload-types'
import { loginCommand } from '@/core/commands/login_command'
import { getActiveProducts } from '@/core/queries/getActiveProductsQuery'

export type ServiceInjector = DependencyInjector<Services, "services">

export interface Services {
  LexicalRenderer: React.FC<RichTextProps>
  auth: {
    getCurrentUser: () => Promise<BaseUser | undefined | null>
    login: () => Promise<void>
  }
  products: {
    getActiveProducts: () => Promise<Product[]>
  }
}

export const servicesProd: Services = {
  LexicalRenderer: LexicalRendererService,
  auth: {
    getCurrentUser: getCurrentUserQuery,
    login: loginCommand
  },
  products: {
    getActiveProducts: getActiveProducts
  }
}

interface ServiceMockBuilderProps {
  children?: React.ReactNode,
  user?: BaseUser | null,
  products?: Product[]
}

export const ServicesMockBuilder =  ({
  children,
  user,
  products
}: ServiceMockBuilderProps): Services => ({
  LexicalRenderer: () => LexicalMocksService({ children }),
  auth: {
    getCurrentUser: async () => user,
    login: async () => {}
  },
  products: {
    getActiveProducts: async () => products ?? []
  }
})