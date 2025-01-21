import { Block, Config } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  BlocksFeature,
  HeadingFeature,
  FeatureProviderServer,
} from '@payloadcms/richtext-lexical'
import { BlockSlug } from '@/ui/lexical/blocks/slug_blogs'
import { HeroBlock } from '@/ui/lexical/blocks/hero_block'
import { TwoColumnsBlock } from '@/ui/lexical/blocks/two_columns_block'
import { GridCardsBlock } from '@/ui/lexical/blocks/grid_cards_block'
export const defaultBlocks = () => [GridCardsBlock, TwoColumnsBlock, HeroBlock]

export const lexicalFeatures = (blocks: () => Block[]): FeatureProviderServer<any, any, any>[] => ([
  HeadingFeature({enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"]}),
  ParagraphFeature(),
  UnderlineFeature(),
  BoldFeature(),
  ItalicFeature(),
  BlocksFeature({ blocks: blocks() }),
  LinkFeature({
    enabledCollections: ['article_pdf', 'article_web', 'video', 'book'],
    fields: ({ defaultFields }) => {
      const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
        if ('name' in field && field.name === 'url') return false
        return true
      })

      return [
        ...defaultFieldsWithoutUrl,
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: ({ linkType }) => linkType !== 'internal',
          },
          label: ({ t }) => t('fields:enterURL'),
          required: true,
        },
      ]
    },
  })
])
const buildLexical: (blocks: () => Block[]) => Config['editor'] = (blocks) => (
  lexicalEditor({
    features: () => {
      return lexicalFeatures(blocks)
    },
  })
)

export const defaultLexical = buildLexical(defaultBlocks)

export function getLexicalFeaturesExcluding(blocksSlugs: BlockSlug[]): FeatureProviderServer<any, any, any>[] {
  const filteredBlocks = () => defaultBlocks().filter(block => !blocksSlugs.includes(block.slug as BlockSlug))
  return lexicalFeatures(filteredBlocks)
}
