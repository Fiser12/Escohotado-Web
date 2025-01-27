type FeaturedType = "article" | "quote" | "book" | "video";

export interface FeaturedBase {
    id: string;
    type: FeaturedType;
}

export interface FeaturedArticleProps extends FeaturedBase {
    type: "article";
    title: string;
    author: string;
    coverHref: string;
    hasPermission: boolean;
    href?: string | null;
    isPdf: boolean;
    detailHref: string;
    categories: Array<{ id: string; singular_name: string; }>;
}

export interface FeaturedQuoteProps extends FeaturedBase {
    type: "quote";
    quote: string;
    author: string;
}

export interface FeaturedBookProps extends FeaturedBase {
    type: "book";
    title: string;
    quote: string;
    author: string;
    coverHref: string;
    detailHref: string;
}

export interface FeaturedVideoProps extends FeaturedBase {
    type: "video";
    title: string;
    coverHref: string;
    hasPermission: boolean;
    href: string | null;
    detailHref: string;
    publishedAt: string | null | undefined;
    categories: Array<{ id: string; singular_name: string; }>;
}

export type Featured = FeaturedArticleProps | FeaturedQuoteProps | FeaturedBookProps | FeaturedVideoProps;
export type FeaturedCard = Featured & { className: string; };
export const convertFeaturedToFeaturedCard = (className: string) => (
    featured: Featured
): FeaturedCard => {
    return {
        ...featured,
        className: className,
    };
};
