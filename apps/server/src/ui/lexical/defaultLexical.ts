import { HeroBlock } from '@/ui/lexical/blocks/hero_block'
import { GridCardsBlock } from '@/ui/lexical/blocks/grid_cards_block'
import { buildLexical } from '@/ui/lexical/lexicalBuilder'

export const defaultBlocks = () => [GridCardsBlock, HeroBlock]

export const defaultLexical = buildLexical(defaultBlocks)

