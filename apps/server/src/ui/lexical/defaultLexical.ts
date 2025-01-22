import { HeroBlock } from '@/ui/lexical/blocks/hero_block'
import { buildLexical } from '@/ui/lexical/lexicalBuilder'
import { WrapperBlock } from './blocks/container_blocks/wrapper_block'

export const defaultBlocks = () => [WrapperBlock, HeroBlock]

export const defaultLexical = buildLexical(defaultBlocks)

