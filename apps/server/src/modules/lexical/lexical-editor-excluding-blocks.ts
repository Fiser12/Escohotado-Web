import { filterBlocksAtLexicalBuilder } from 'payload-lexical-blocks-builder/builder'
import { BlockSlug } from '@/modules/lexical/blocks/slug-blogs'
import { defaultBlocks } from '@/modules/lexical/default-blocks'
import { buildLexical } from '@/modules/lexical/lexical-builder'

export const lexicalEditorExcludingBlocks = (blocksSlugs: BlockSlug[]) =>
  filterBlocksAtLexicalBuilder(buildLexical, defaultBlocks, blocksSlugs)
