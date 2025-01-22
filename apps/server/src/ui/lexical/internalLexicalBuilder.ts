import { Block } from "payload"
import { BlockSlug } from "./blocks/slug_blogs"
import { TwoColumnsBlock } from "./blocks/two_columns_block"
import { GridCardsBlock } from "./blocks/grid_cards_block"

export const internalLexicalBlocks = () => [
    TwoColumnsBlock,
    GridCardsBlock
]

export function internalLexicalBlocksExcluding(blocksSlugs: BlockSlug[]): Block[] {
    return internalLexicalBlocks().filter(block => !blocksSlugs.includes(block.slug as BlockSlug))
}
  