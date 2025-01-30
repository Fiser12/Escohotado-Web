import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB, COLLECTION_SLUG_BOOK, COLLECTION_SLUG_VIDEO,  } from './collectionsSlugs'
type ArticleWebId = { id: number; slug: string };
type ArticlePdfId = { id: number };
type BookId = { id: number; slug: string };
type VideoId = { id: number };
type QuoteId = { id: string };

type ContentRelationType =
  | { slug: typeof COLLECTION_SLUG_ARTICLE_WEB; value: ArticleWebId }
  | { slug: typeof COLLECTION_SLUG_ARTICLE_PDF; value: ArticlePdfId }
  | { slug: typeof COLLECTION_SLUG_BOOK; value: BookId }
  | { slug: typeof COLLECTION_SLUG_VIDEO; value: VideoId };


export const generateDetailHref = (field: ContentRelationType): string => {
  switch (field.slug) {
    case 'article_pdf':
      return `/articulos/pdf/${field.value.id}`;
    case 'article_web':
      return `/articulos/${field.value.slug}`;
    case 'video':
      return `/videos/${field.value.id}`;
    case 'book':
      return `/biblioteca/${field.value.slug}`;
    default:
      return '';
  }
};
