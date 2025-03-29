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
  InlineCodeFeature,
} from '@payloadcms/richtext-lexical'
import { collectionsContentsSlugs } from '@/core/collectionsSlugs'
import { buildLexicalByFeatures } from 'payload-lexical-blocks-builder/builder'

export const defaultFeatures = () => [
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
          ],
        },
      ]
    },
  }),
  HTMLConverterFeature({})
]

export const buildLexical = buildLexicalByFeatures(defaultFeatures)
