
export interface LexicalBlockProps<T> {
    node: {
        fields: T
    }
}
export type BlockRendererFunction =({ node }: LexicalBlockProps<any>) => Promise<any> | any
export type BlocksRendererFunctions<T extends string> = Record<T, BlockRendererFunction>


export const generateStoryForLexicalBlock = <T>(args: T) => {
    return {
        args: {
            node: { fields: args }
        }
    }
}