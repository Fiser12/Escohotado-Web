import { addForumPremiumRoleCommand } from '@/core/auth/keycloak/add-forum-premium-role-command'
import { deleteForumPremiumRoleCommand } from '@/core/auth/keycloak/delete-forum-premium-role-command'
import authJSPlugin from '@/payload/plugins/authjs'
import nestedDocsPlugin from '@/payload/plugins/nestedDocs'
import s3Plugin from '@/payload/plugins/s3'
import searchPlugin from '@/payload/plugins/search'
import { sentryPlugin } from '@payloadcms/plugin-sentry'
import * as Sentry from '@sentry/nextjs'
import { plugin as stripePlugin } from 'payload-stripe-inventory/server'
import { getPayload } from '../utils/get-payload'

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
