import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB, COLLECTION_SLUG_BOOK, COLLECTION_SLUG_VIDEO,  } from './collectionsSlugs'
type ArticleWebId = { id: string; slug?: string | null };
type ArticlePdfId = { id: string };
type BookId = { id: string; slug?: string | null };
type VideoId = { id: string };

type ContentRelationType =
  | { collection: typeof COLLECTION_SLUG_ARTICLE_WEB; value: ArticleWebId }
  | { collection: typeof COLLECTION_SLUG_ARTICLE_PDF; value: ArticlePdfId }
  | { collection: typeof COLLECTION_SLUG_BOOK; value: BookId }
  | { collection: typeof COLLECTION_SLUG_VIDEO; value: VideoId };


export const generateDetailHref = (field: ContentRelationType): string => {
  switch (field.collection) {
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
