import { LexicalRendererService, RichTextProps } from './lexical/renderer/LexicalRendererService'

interface Services {
  LexicalRenderer: React.FC<RichTextProps>
}

export const Services: Services = {
  LexicalRenderer: LexicalRendererService,
}
