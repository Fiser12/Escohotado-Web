export const heroBlockSlug = 'hero_block'
export const newsletterSubscriptionBlockSlug = 'newsletter_subscription_block'
export const wrapperBlockSlug = 'wrapper_block'
export const twoColumnsBlockSlug = 'two_columns_block'
export const gridCardsBlockSlug = 'grid_cards_block'

export const allSlugs = [
    heroBlockSlug,
    newsletterSubscriptionBlockSlug,
    wrapperBlockSlug,
    gridCardsBlockSlug,
    twoColumnsBlockSlug
] as const

export type BlockSlug = typeof allSlugs[number]
