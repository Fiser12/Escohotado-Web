import { Config } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  BlocksFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'
import { GridCardsBlock } from '@/ui/lexical/blocks/grid_cards'
import { TwoColumnsBlock } from '@/ui/lexical/blocks/two_columns_block'

export const defaultLexical: Config['editor'] = lexicalEditor({
  features: () => {
    return [
      HeadingFeature({enabledHeadingSizes: ["h1", "h2", "h3", "h4", "h5", "h6"]}),
      ParagraphFeature(),
      UnderlineFeature(),
      BoldFeature(),
      ItalicFeature(),
      BlocksFeature({ blocks: [GridCardsBlock, TwoColumnsBlock] }),
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
      }),
    ]
  },
})