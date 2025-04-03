import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { RichtextLexicalRenderer } from './richtext-lexical-renderer';

type WithData = {
    className?: string;
    data?: SerializedEditorState | null;
    children?: never;
};

type WithChildren = {
    className?: string;
    children: React.ReactNode;
    data?: SerializedEditorState | null;
};

export type RichTextProps = WithData | WithChildren;

export const LexicalRendererService: React.FC<RichTextProps> = ({ children, data, className }) => {
    if (children) return children
    if (data) return <RichtextLexicalRenderer
        className={className}
        data={data}
    />;
    return <p></p>
};
