export const heroBlockSlug = 'hero_block'
export const uiBlockSlug = 'ui_block'
export const booksCarouselBlockSlug = 'books_carousel_block'
export const newsletterSubscriptionBlockSlug = 'newsletter_subscription_block'
export const wrapperBlockSlug = 'wrapper_block'
export const twoColumnsBlockSlug = 'two_columns_block'
export const gridCardsBlockSlug = 'grid_cards_block'

export const allSlugs = [
    uiBlockSlug,
    heroBlockSlug,
    booksCarouselBlockSlug,
    newsletterSubscriptionBlockSlug,
    wrapperBlockSlug,
    gridCardsBlockSlug,
    twoColumnsBlockSlug
] as const

export type BlockSlug = typeof allSlugs[number]
