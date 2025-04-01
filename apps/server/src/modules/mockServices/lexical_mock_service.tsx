import { RichTextProps } from "../lexical/renderer/LexicalRendererService";

export const LexicalMocksServices: Record<string, React.FC<RichTextProps>> = {
    Default: () => {
        return <div>Default</div>
    }
}