import { Block } from "payload"
import { BlockSlug } from "./blocks/slug_blogs"
import { TwoColumnsBlock } from "./blocks/content_blocks/two_columns_block/block"

export const internalLexicalBlocks = () => [
    TwoColumnsBlock,
]

export function internalLexicalBlocksExcluding(blocksSlugs: BlockSlug[]): Block[] {
    return internalLexicalBlocks().filter(block => !blocksSlugs.includes(block.slug as BlockSlug))
}
  