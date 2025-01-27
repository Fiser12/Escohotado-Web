type ContentType = "article" | "quote" | "book" | "video";

export interface ContentHeaderBaseModel {
    id: string;
    type: ContentType;
}

export interface ArticleHeaderModel extends ContentHeaderBaseModel {
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

export interface QuoteHeaderModel extends ContentHeaderBaseModel {
    type: "quote";
    quote: string;
    author: string;
}

export interface BookHeaderModel extends ContentHeaderBaseModel {
    type: "book";
    title: string;
    quote: string;
    author: string;
    coverHref: string;
    detailHref: string;
}

export interface VideoHeaderModel extends ContentHeaderBaseModel {
    type: "video";
    title: string;
    coverHref: string;
    hasPermission: boolean;
    href: string | null;
    detailHref: string;
    publishedAt: string | null | undefined;
    categories: Array<{ id: string; singular_name: string; }>;
}

export type ContentHeaderModel = ArticleHeaderModel | QuoteHeaderModel | BookHeaderModel | VideoHeaderModel;
export type ContentCardModel = ContentHeaderModel & { className: string; };
export const convertContentModelToCard = (className: string) => (
    featured: ContentHeaderModel
): ContentCardModel => {
    return {
        ...featured,
        className: className,
    };
};
