import { RichTextRenderer } from '../../../RichTextRenderer'
import { ContentWrapper } from 'gaudi/server'

export const renderer = async ({ node }: any) => {
  return <ContentWrapper >
    <RichTextRenderer data={node.fields.content} />
  </ContentWrapper>
}
