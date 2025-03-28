import searchPlugin from '@/payload/plugins/search'
import { plugin as stripePlugin } from 'payload-stripe-inventory/server'
import authJSPlugin from '@/payload/plugins/authjs'
import nestedDocsPlugin from '@/payload/plugins/nestedDocs'
import s3Plugin from '@/payload/plugins/s3'
import { sentryPlugin } from '@payloadcms/plugin-sentry'
import * as Sentry from '@sentry/nextjs'
import { addForumPremiumRoleCommand } from '@/core/auth/keycloak/addForumPremiumRoleCommand'
import { deleteForumPremiumRoleCommand } from '@/core/auth/keycloak/deleteForumPremiumRoleCommand'
import { getPayload } from '../utils/getPayload'

const updateForumPremiumRole = async (type: 'create' | 'delete', userId: string) => {
  if (type === 'create') {
    await addForumPremiumRoleCommand(userId)
  } else {
    await deleteForumPremiumRoleCommand(userId)
  }
}

const plugins = [
  stripePlugin(updateForumPremiumRole, getPayload),
  nestedDocsPlugin,
  authJSPlugin,
  sentryPlugin({ Sentry }),
  searchPlugin,
  s3Plugin,
]

export default plugins
