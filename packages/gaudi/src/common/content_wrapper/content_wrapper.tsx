
type Args = {
    className: string,
    backgroundClassname: string,
    children: React.ReactNode
}


export const ContentWrapper = ( {className, backgroundClassname, children}: Args ) => {
    return(
        <div className={`w-full h-full px-6 ${backgroundClassname}`}>
            <div className={`mx-auto max-w-screen-xl w-full ${className}`}>
                {children}
            </div>
        </div>
    )
}