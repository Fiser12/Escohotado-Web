import path from 'path'
import { en } from 'payload/i18n/en'
import { es } from 'payload/i18n/es'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { users } from '@/payload/collections/user/user'
import { migrations } from '@/migrations'
import plugins from '@/payload/plugins'
import globals from '@/payload/globals/static_pages'
import collections from '@/payload/collections'
import { defaultLexical } from '@/modules/lexical/defaultLexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  editor: defaultLexical,
  collections,
  globals,
  db: postgresAdapter({
    prodMigrations: migrations,
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  plugins,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    supportedLanguages: { es, en },
    fallbackLanguage: 'es',
  },
  logger: {
    options: {
      level: 'debug',
    },
  },
  graphQL: {
    disable: true,
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Español',
        code: 'es',
      },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
  cors: ['https://checkout.stripe.com', `${process.env.NEXT_PUBLIC_SITE_URL}` || ''],
  csrf: ['https://checkout.stripe.com', process.env.NEXT_PUBLIC_SITE_URL || ''],
  admin: {
    user: users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          height: 667,
          label: 'Mobile',
          width: 375,
        },
        {
          name: 'desktop',
          height: 720,
          label: 'Desktop',
          width: 1280,
        },
      ],
    },
  },
  sharp,
})
