import classNames from 'classnames'
import { RichTextRenderer } from '../../../RichTextRenderer'
import { ContentWrapper } from 'gaudi/server'

export const renderer = async ({ node }: any) => {
      const className = classNames(
          'py-10 h-full',
          {
              'bg-white': node.fields.type === 'white',
              'bg-gray-light': node.fields.type === 'gray',
          }
      );
  
  return <ContentWrapper backgroundClassname={className} >
    <RichTextRenderer data={node.fields.content} />
  </ContentWrapper>
}
