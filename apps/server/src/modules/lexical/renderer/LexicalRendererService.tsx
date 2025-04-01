import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { JSXConvertersFunction, LinkJSXConverter, RichText as RichTextWithoutBlocks } from '@payloadcms/richtext-lexical/react';
import { blockRenderers } from '../blockRenderers';
import { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical';
type NodeTypes = | DefaultNodeTypes

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
  
  
export interface RichTextProps {
    className?: string;
    data: SerializedEditorState;
}

export const LexicalRendererService: React.FC<RichTextProps> = (props) => {
    return <RichTextWithoutBlocks
        converters={jsxConverters}
        className={props.className}
        data={props.data} />;
};
