export const COLLECTION_SLUG_USER = 'users' as const
export const COLLECTION_SLUG_MEDIA = 'media' as const
export const COLLECTION_SLUG_TAXONOMY = 'taxonomy' as const
export const COLLECTION_SLUG_PERMISSION = 'permission' as const
export const COLLECTION_SLUG_PRODUCTS = 'products' as const
export const COLLECTION_SLUG_PRICES = 'prices' as const
export const COLLECTION_SLUG_SUBSCRIPTIONS = 'subscriptions' as const
export const COLLECTION_SLUG_PDF = 'pdf' as const
export const COLLECTION_SLUG_ARTICLE_WEB = 'article_web' as const
export const COLLECTION_SLUG_BOOK = 'book' as const
export const COLLECTION_SLUG_QUOTE = 'quote' as const
export const COLLECTION_SLUG_VIDEO = 'video' as const
export const COLLECTION_SLUG_UI_GRID_CARDS = 'ui_grid_cards' as const
export const COLLECTION_SLUG_UI_BLOCK = 'ui_block' as const

export const collectionsContentsSlugs = [
    COLLECTION_SLUG_ARTICLE_WEB,
    COLLECTION_SLUG_BOOK,
    COLLECTION_SLUG_QUOTE,
    COLLECTION_SLUG_VIDEO,
]
export const collectionsContentsWithDetailsSlugs = [
    COLLECTION_SLUG_ARTICLE_WEB,
    COLLECTION_SLUG_BOOK,
    COLLECTION_SLUG_VIDEO,
]

export const collectionsSlugs = [
    COLLECTION_SLUG_USER,
    COLLECTION_SLUG_MEDIA,
    COLLECTION_SLUG_TAXONOMY,
    COLLECTION_SLUG_PERMISSION,
    COLLECTION_SLUG_PRODUCTS,
    COLLECTION_SLUG_PRICES,
    COLLECTION_SLUG_SUBSCRIPTIONS,
    COLLECTION_SLUG_UI_GRID_CARDS,
    COLLECTION_SLUG_UI_BLOCK,
    ...collectionsContentsSlugs
]
