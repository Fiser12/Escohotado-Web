import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_QUOTE, COLLECTION_SLUG_ARTICLE_WEB, COLLECTION_SLUG_BOOK, COLLECTION_SLUG_VIDEO,  } from './collectionsSlugs'
type Content = { id: string; slug?: string | null };

type ContentRelationType =
  | { collection: typeof COLLECTION_SLUG_QUOTE; value: Content }
  | { collection: typeof COLLECTION_SLUG_ARTICLE_WEB; value: Content }
  | { collection: typeof COLLECTION_SLUG_ARTICLE_PDF; value: Content }
  | { collection: typeof COLLECTION_SLUG_BOOK; value: Content }
  | { collection: typeof COLLECTION_SLUG_VIDEO; value: Content };


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
