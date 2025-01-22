import { getCurrentUserQuery } from '@/core/auth/payloadUser/getCurrentUserQuery'
import { mapCards } from '@/core/domain/mapping/mapCards'
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
import { GridCardsBlock as GridCardsBlockUI } from 'gaudi/server'
import { GridCardsBlock } from 'payload-types'
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

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichTextRenderer(props: Props) {
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