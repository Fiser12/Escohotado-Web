
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    backgroundClassname?: string,
    children: React.ReactNode
}

export const ContentWrapper: React.FC<Props> = ({ className, backgroundClassname, children, ...rest }) => {
    return (
        <div className={`w-full h-full px-6 ${backgroundClassname}`} {...rest}>
            <div className={`mx-auto max-w-screen-xl w-full ${className}`}>
                {children}
            </div>
        </div>
    )
}