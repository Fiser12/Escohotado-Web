import { buildLexical } from '@/lexical/lexicalBuilder'
import { WrapperBlock } from './blocks/container_blocks/wrapper_block/block'
import { HeroBlock } from './blocks/container_blocks/hero_block/block'
import { BooksCarouselBlock } from './blocks/container_blocks/books_carousel_block/block'
import { UIBlock } from './blocks/container_blocks/ui_block/block'
import { GridCardsBlock } from './blocks/content_blocks/grid_cards_block/block'
import { Block, BlockSlug } from 'payload'

export const defaultBlocks = () => [WrapperBlock, HeroBlock, BooksCarouselBlock, UIBlock, GridCardsBlock]

export const defaultLexical = buildLexical(defaultBlocks)

export function lexicalBlocksExcluding(blocksSlugs: BlockSlug[]): Block[] {
    return defaultBlocks().filter(block => !blocksSlugs.includes(block.slug as BlockSlug))
}
