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
import { collectionsContentsWithDetailsSlugs } from 'hegel/payload'

export const lexicalFeatures = (blocks: () => Block[]): FeatureProviderServer<any, any, any>[] => [
  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
  ParagraphFeature(),
  UnderlineFeature(),
  BoldFeature(),
  ItalicFeature(),
  BlocksFeature({ blocks: blocks() }),
  LinkFeature({
    enabledCollections: collectionsContentsWithDetailsSlugs,
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
  }),
]

export function buildLexical(blocks: () => Block[]): Config['editor'] {
  return lexicalEditor({
    features: () => {
      return lexicalFeatures(blocks)
    },
  })
}
