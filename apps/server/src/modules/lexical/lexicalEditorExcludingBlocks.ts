import { filterBlocksAtLexicalBuilder } from 'payload-lexical-blocks-builder/builder'
import { BlockSlug } from './blocks/slug_blogs'
import { defaultBlocks } from './defaultBlocks'
import { buildLexical } from './lexicalBuilder'

export const lexicalEditorExcludingBlocks = (blocksSlugs: BlockSlug[]) => filterBlocksAtLexicalBuilder(buildLexical, defaultBlocks, blocksSlugs)