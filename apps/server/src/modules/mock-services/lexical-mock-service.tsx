const DefaultLexicalMockRenderer = () => {
    return <div>Default</div>
}

interface LexicalMocksServicesProps {
    children?: React.ReactNode
}
export const LexicalMocksService: React.FC<LexicalMocksServicesProps> = ({children = <DefaultLexicalMockRenderer />}) => {
    return children
}