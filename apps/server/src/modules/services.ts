import { DependencyInjector } from 'hegel/react'
import { LexicalRendererService, RichTextProps } from './lexical/renderer/LexicalRendererService'
import { LexicalMocksServices } from './mockServices/lexical_mock_service'

export type ServiceInjector = DependencyInjector<Services, "services">

export interface Services {
  LexicalRenderer: React.FC<RichTextProps>
}

export const servicesProd: Services = {
  LexicalRenderer: LexicalRendererService,
}

export const ServicesMock: Services = {
  LexicalRenderer: LexicalMocksServices.Default,
}
