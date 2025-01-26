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
  blocks: blockRenderers
})

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: SerializedEditorState
}

export function LexicalRenderer(props: Props) {
  const { className, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={classNames(
        "max-w-none",
        "article-html-content",
        className,
      )}
      {...rest}
    />
  )
}