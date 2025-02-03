import searchPlugin from '@/payload/plugins/search'
import stripePlugin from '@/payload/plugins/stripe'
import authJSPlugin from '@/payload/plugins/authjs'
import nestedDocsPlugin from '@/payload/plugins/nestedDocs'
import s3Plugin from '@/payload/plugins/s3'
import { sentryPlugin } from '@payloadcms/plugin-sentry'
import * as Sentry from '@sentry/nextjs'

const plugins = [
    stripePlugin,
    nestedDocsPlugin,
    authJSPlugin,
    sentryPlugin({ Sentry }),
    searchPlugin,
    s3Plugin,
  ]

  export default plugins