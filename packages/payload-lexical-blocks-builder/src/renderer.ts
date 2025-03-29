
export type BlockRendererFunction =({ node }: any) => Promise<any>
export type BlocksRendererFunctions<T extends string> = Record<T, BlockRendererFunction>

export interface LexicalBlockProps<T> {
    node: {
        fields: T
    }
}
