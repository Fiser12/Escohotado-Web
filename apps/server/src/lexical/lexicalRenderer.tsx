import {
  DefaultNodeTypes,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,

  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'
import classNames from 'classnames'
import { blockRenderers } from './blockRenderers'
import { ContentWrapper } from 'gaudi/server'

type NodeTypes =
  | DefaultNodeTypes

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: blockRenderers,
})

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: SerializedEditorState
}

export function LexicalRenderer(props: Props) {
  const { className, ...rest } = props
  return (
    <ContentWrapper>
      <RichTextWithoutBlocks
        converters={jsxConverters}
        className={classNames(
          'article-html-content',
          "max-w-none",
          "w-full",
          className,
        )}
        {...rest}
      />
    </ContentWrapper>
  )
}