export const photosCarouselBlock = 'photos_carousel_block'
export const uiBlockSlug = 'ui_block'
export const highlightSlug = 'highlight_block'
export const buttonsSlug = 'buttons_block'
export const booksCarouselBlockSlug = 'books_carousel_block'
export const wrapperBlockSlug = 'wrapper_block'
export const twoColumnsBlockSlug = 'two_columns_block'
export const gridCardsBlockSlug = 'grid_cards_block'

export const allSlugs = [
    uiBlockSlug,
    buttonsSlug,
    photosCarouselBlock,
    booksCarouselBlockSlug,
    wrapperBlockSlug,
    gridCardsBlockSlug,
    highlightSlug,
    twoColumnsBlockSlug
] as const

export type BlockSlug = typeof allSlugs[number]
