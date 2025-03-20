import { buildLexical } from '@/lexical/lexicalBuilder'
import { WrapperBlock } from './blocks/wrapper_block/block'
import { PhotosCarouselBlock } from './blocks/photos_carousel_block/block'
import { BooksCarouselBlock } from './blocks/books_carousel_block/block'
import { UIBlock } from './blocks/ui_block/block'
import { GridCardsBlock } from './blocks/grid_cards_block/block'
import { Block } from 'payload'
import { BlockSlug } from './blocks/slug_blogs'
import { TwoColumnsBlock } from './blocks/two_columns_block/block'
import { HighlightBlock } from './blocks/highlight_block/block'
import { ButtonsBlock } from './blocks/button_block/block'
import { HeroBlock } from './blocks/hero_block/block'

export const defaultBlocks = () => [
  WrapperBlock,
  HeroBlock,
  ButtonsBlock,
  HighlightBlock,
  PhotosCarouselBlock,
  BooksCarouselBlock,
  UIBlock,
  GridCardsBlock,
  TwoColumnsBlock
]

export const defaultLexical = buildLexical(defaultBlocks)

export function lexicalBlocksExcluding(blocksSlugs: BlockSlug[]): Block[] {
  return defaultBlocks().filter((block) => !blocksSlugs.includes(block.slug as BlockSlug))
}
