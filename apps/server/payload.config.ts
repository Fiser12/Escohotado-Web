import path from 'path'
import { en } from 'payload/i18n/en'
import { es } from 'payload/i18n/es'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { authConfig } from '@/payload/plugins/authjs/auth.config'
import { users } from '@/payload/collections/user'
import taxonomy from '@/payload/collections/taxonomy'
import media from '@/payload/collections/media'
import { authjsPlugin } from 'payload-authjs'
import { subscriptions } from '@/payload/collections/stripe/subscriptions'
import { prices } from '@/payload/collections/stripe/prices'
import permissions from '@/payload/fields/permissions'
import { products } from '@/payload/collections/stripe/products'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import {
  COLLECTION_SLUG_MEDIA,
  COLLECTION_SLUG_ARTICLE_PDF,
  COLLECTION_SLUG_VIDEO,
  COLLECTION_SLUG_ARTICLE_WEB,
  COLLECTION_SLUG_BOOK,
} from '@/payload/collections/config'
import { sentryPlugin } from '@payloadcms/plugin-sentry'
import * as Sentry from '@sentry/nextjs'
import { S3_PLUGIN_CONFIG } from '@/payload/plugins/s3'
import { s3Storage as s3StoragePlugin } from '@payloadcms/storage-s3'
import { contentCollections } from '@/payload/collections/content'
import { migrations } from '@/migrations'
import { searchPlugin } from '@payloadcms/plugin-search'
import { HomePage } from '@/payload/globals/static_pages/home'
import { uiCollections } from '@/payload/collections/ui'
import { defaultLexical } from '@/ui/lexical/defaultLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: defaultLexical,
  collections: [
    users,
    prices,
    products,
    subscriptions,
    media,
    taxonomy,
    ...contentCollections,
    ...uiCollections,
    permissions,
  ],
  globals: [HomePage],
  db: postgresAdapter({
    idType: 'uuid',
    prodMigrations: migrations,
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  plugins: [
    stripePlugin({
      isTestKey: process.env.STRIPE_SECRET_KEY?.includes('sk_test'),
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET,
    }),
    authjsPlugin({ authjsConfig: authConfig }) as any,
    sentryPlugin({ Sentry }),
    searchPlugin({
      collections: [
        COLLECTION_SLUG_VIDEO,
        COLLECTION_SLUG_ARTICLE_WEB,
        COLLECTION_SLUG_ARTICLE_PDF,
        COLLECTION_SLUG_BOOK,
      ],
      searchOverrides: {
        slug: 'search-results',
        fields: ({ defaultFields }: any) => [
          ...defaultFields,
          {
            name: 'tags',
            type: 'text',
            admin: {
              readOnly: true,
            },
          },
        ],
      },
      defaultPriorities: {
        [COLLECTION_SLUG_VIDEO]: (doc: any) =>
          doc.publishedAt ? new Date(doc.publishedAt).getTime() : 0,
        [COLLECTION_SLUG_BOOK]: (doc: any) =>
          doc.publishedAt ? new Date(doc.publishedAt).getTime() : 0,
        [COLLECTION_SLUG_ARTICLE_WEB]: (doc: any) =>
          doc.publishedAt ? new Date(doc.publishedAt).getTime() : 0,
        [COLLECTION_SLUG_ARTICLE_PDF]: (doc: any) =>
          doc.publishedAt ? new Date(doc.publishedAt).getTime() : 0,
      },
      beforeSync: ({ originalDoc, searchDoc }: any) => {
        return {
          ...searchDoc,
          tags: originalDoc.tags?.join(', ') ?? originalDoc.seeds,
        }
      },
    }),
    s3StoragePlugin({
      ...S3_PLUGIN_CONFIG,
      collections: {
        [COLLECTION_SLUG_MEDIA]: {
          disableLocalStorage: true,
          prefix: 'media',
        },
        [COLLECTION_SLUG_ARTICLE_PDF]: {
          disableLocalStorage: true,
          prefix: 'article_pdf',
        },
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { es, en },
    fallbackLanguage: 'es',
  },
  cors: ['https://checkout.stripe.com', `${process.env.NEXT_PUBLIC_SITE_URL}` || ''],
  csrf: ['https://checkout.stripe.com', process.env.NEXT_PUBLIC_SITE_URL || ''],
  admin: {
    user: users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  sharp,
})
