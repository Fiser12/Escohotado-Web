import { DependencyInjector } from 'hegel/react'
import { LexicalRendererService, RichTextProps } from './lexical/renderer/LexicalRendererService'
import { LexicalMocksService } from './mockServices/lexical_mock_service'
import { BaseUser } from 'payload-access-control'
import { Product } from 'payload-types'

export type ServiceInjector = DependencyInjector<Services, "services">

export interface Services {
  LexicalRenderer: React.FC<RichTextProps>
}

export const servicesProd: Services = {
  LexicalRenderer: LexicalRendererService,
}

export const ServicesMock: Services = {
  LexicalRenderer: LexicalMocksService
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
})