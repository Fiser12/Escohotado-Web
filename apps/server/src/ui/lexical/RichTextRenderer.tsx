import { getCurrentUserQuery } from '@/core/auth/payloadUser/getCurrentUserQuery'
import { mapCards } from '@/core/domain/mapping/mapCards'
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
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
import { ContentWrapper, GridCardsBlock as GridCardsBlockUI } from 'gaudi/server'
import { GridCardsBlock } from 'payload-types'

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
  blocks: {
    grid_cards: async ({ node }: any) => {
      const user = await getCurrentUserQuery();
      const gridCards = node?.fields as GridCardsBlock
      const result = mapCards(user)(gridCards)
      return <GridCardsBlockUI features={result.features} gridClassname={result.gridClassname} />


    },
    two_columns_block: async ({ node }: any) => {
      const type = node?.fields?.type
      const leftSpan =
        type === "1x3" ? "col-span-1" :
          type === "2x2" ? "col-span-2" :
            type === "3x1" ? "col-span-3" :
              "col-span-2";

      const rightSpan =
        type === "1x3" ? "col-span-3" :
          type === "2x2" ? "col-span-2" :
            type === "3x1" ? "col-span-1" :
              "col-span-2";
      return <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {node?.fields?.left &&
          <div className={`${leftSpan}`}>
            <RichTextRenderer data={node.fields.left} />
          </div>
        }
        {node?.fields?.right &&
          <div className={`${rightSpan}`}>
            <RichTextRenderer data={node.fields.right} />
          </div>
        }
      </div>
    }
  }
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export function RichTextRenderer(props: Props) {
  const { className, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={classNames(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
        },
        className,
      )}
      {...rest}
    />
  )
}