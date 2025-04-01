import { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical';
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { JSXConvertersFunction, LinkJSXConverter, RichText } from '@payloadcms/richtext-lexical/react';
import { blockRenderers } from '../block-renderers';
type NodeTypes = | DefaultNodeTypes

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const { value, relationTo } = linkNode.fields.doc!
    if (typeof value !== 'object') {
        throw new Error('Expected value to be an object')
    }
    const slug = value.slug
    return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

function jsxConverters(): JSXConvertersFunction<NodeTypes> {
    return ({ defaultConverters }) => ({
        ...defaultConverters,
        ...LinkJSXConverter({ internalDocToHref }),
        blocks: blockRenderers,
    })
}

export const RichtextLexicalRenderer = ({ className, data }: { className?: string, data: SerializedEditorState }) => {
    return <RichText
        converters={jsxConverters()}
        className={className}
        data={data}
    />
}