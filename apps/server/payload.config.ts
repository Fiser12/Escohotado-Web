import path from 'path'
import { en } from 'payload/i18n/en'
import { es } from 'payload/i18n/es'

import {
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { authConfig } from '@/plugins/authjs/auth.config'
import {users} from '@/collections/user'
import media from '@/collections/media'
import { authjsPlugin } from 'payload-authjs'
import { prices, products, subscriptions } from '@/collections/stripe'
import { priceUpsert, subscriptionDeleted, subscriptionUpsert } from '@/plugins/stripe'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { COLLECTION_SLUG_PAGE, COLLECTION_SLUG_PRODUCTS } from '@/collections/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    users, 
    prices,
    products,
    subscriptions,
    media
  ],
  plugins: [
    authjsPlugin({ authjsConfig: authConfig }),
    stripePlugin({
      isTestKey: process.env.STRIPE_SECRET_KEY?.includes('sk_test'),
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET,
    }
  ),

  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || ''
  }),

  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { es, en },
    fallbackLanguage: "es"
  },
  cors: ['https://checkout.stripe.com', `${process.env.NEXT_PUBLIC_SITE_URL}` || ''],
  csrf: ['https://checkout.stripe.com', process.env.NEXT_PUBLIC_SITE_URL || ''],
  admin: {
    user: users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: ({ data, locale }) => `${process.env.NEXT_PUBLIC_SITE_URL}/preview${data.path}${locale ? `?locale=${locale.code}` : ''}`,
      collections: [COLLECTION_SLUG_PAGE]
    }
  },
  sharp,
})
