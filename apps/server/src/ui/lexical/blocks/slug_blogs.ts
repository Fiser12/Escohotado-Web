import { GridCardsBlock } from "./grid_cards_block"
import { HeroBlock } from "./hero_block"
import { TwoColumnsBlock } from "./two_columns_block"

export const heroBlockSlug = 'hero_block'
export const twoColumnsBlockSlug = 'two_columns_block'
export const gridCardsBlockSlug = 'grid_cards_block'

export const allSlugs = [
    'hero_block',
    'two_columns_block',
    'grid_cards_block'
] as const

export type BlockSlug = typeof allSlugs[number]
