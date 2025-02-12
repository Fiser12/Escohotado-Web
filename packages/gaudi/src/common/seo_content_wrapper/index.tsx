
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string
    imageHref: string;
    ogType: string;
}


export const SEOContentWrapper: React.FC<Props> = ({ children, title, description, imageHref, ogType }) => {
    const seoDescription = description.replaceAll(/<[^>]*>/g, '').slice(0, 200);
    return <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:image" content={imageHref} />
        <meta property="og:description" content={seoDescription} />
        <meta name="description" content={seoDescription} />
        <meta property="og:type" content={ogType} />
        {children}
    </>
}