import { Block, Config } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  BlocksFeature,
  BlockquoteFeature,
  HeadingFeature,
  FeatureProviderServer,
  HTMLConverterFeature,
  IndentFeature,
  FixedToolbarFeature,
  StrikethroughFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  UploadFeature,
  AlignFeature,
  OrderedListFeature,
  UnorderedListFeature,
  SubscriptFeature,
  SuperscriptFeature,
  InlineCodeFeature
} from '@payloadcms/richtext-lexical'
import { collectionsContentsSlugs } from 'hegel/payload'

export const lexicalFeatures = (blocks: () => Block[]): FeatureProviderServer<any, any, any>[] => [
  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
  InlineToolbarFeature(),
  ParagraphFeature(),
  AlignFeature(),
  UploadFeature(),
  UnderlineFeature(),
  BlockquoteFeature(),
  IndentFeature(),
  OrderedListFeature(),
  UnorderedListFeature(),
  StrikethroughFeature(),
  FixedToolbarFeature(),
  SubscriptFeature(),
  SuperscriptFeature(),
  BoldFeature(),
  InlineCodeFeature(),
  HorizontalRuleFeature(),
  ItalicFeature(),
  BlocksFeature({ blocks: blocks() }),
  LinkFeature({
    enabledCollections: collectionsContentsSlugs,
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
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Inline', value: 'inline' },
          ]
        }
      ]
    },
  }),
  HTMLConverterFeature({})
]

export function buildLexical(blocks: () => Block[]): Config['editor'] {
  return lexicalEditor({
    features: () => {
      return lexicalFeatures(blocks)
    },
  })
}
