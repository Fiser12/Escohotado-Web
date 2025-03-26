import { CategoryModel } from "./types/CategoryModel";

type ContentType = "article" | "quote" | "book" | "video" | "media";

export interface ContentHeaderBaseModel {
    id: number;
    type: ContentType;
}

export interface ArticleHeaderModel extends ContentHeaderBaseModel {
    type: "article";
    title: string;
    author: string;
    coverHref?: string | null;
    hasPermission: boolean;
    href?: string | null;
    isPdf: boolean;
    detailHref: string;
    categories: CategoryModel[];
}

export interface QuoteHeaderModel extends ContentHeaderBaseModel {
    type: "quote";
    quote: string;
    author: string;
    context?: string | null;
    origen?: OrigenModel | null;
    categories: CategoryModel[];
}

export interface OrigenModel {
    title: string;
    type: string;
    detailHref: string
    hasPermissions: boolean
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
    categories: CategoryModel[];
}

export interface MediaHeaderModel extends ContentHeaderBaseModel {
    type: "media";
    title?: string | null;
    mediaHref?: string | null;
    width?: number | null;
    height?: number | null;
}


export type ContentHeaderModel = ArticleHeaderModel | QuoteHeaderModel | BookHeaderModel | VideoHeaderModel | MediaHeaderModel;
export type ContentCardModel = ContentHeaderModel & { className: string; };
export const convertContentModelToCard = (className: string) => (
    featured: ContentHeaderModel
): ContentCardModel => {
    return {
        ...featured,
        className: className,
    };
};
