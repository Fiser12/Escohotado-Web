import { buildLexical } from '@/ui/lexical/lexicalBuilder'
import { WrapperBlock } from './blocks/container_blocks/wrapper_block/block'
import { HeroBlock } from './blocks/container_blocks/hero_block/block'

export const defaultBlocks = () => [WrapperBlock, HeroBlock]

export const defaultLexical = buildLexical(defaultBlocks)

