import { LexicalRenderer } from '../../../lexicalRenderer';

export const renderer = async ({ node }: any) => {
    const type = node?.fields?.type;
    const leftSpan = type === "1x3" ? "col-span-1" :
        type === "2x2" ? "col-span-2" :
            type === "3x1" ? "col-span-3" :
                "col-span-2";

    const rightSpan = type === "1x3" ? "col-span-3" :
        type === "2x2" ? "col-span-2" :
            type === "3x1" ? "col-span-1" :
                "col-span-2";
    return <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {node?.fields?.left &&
            <div className={`article-html-content ${leftSpan}`}>
                <LexicalRenderer data={node.fields.left} />
            </div>}
        {node?.fields?.right &&
            <div className={`article-html-content ${rightSpan}`}>
                <LexicalRenderer data={node.fields.right} />
            </div>}
    </div>;
};
