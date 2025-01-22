import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_SUBSCRIPTIONS, COLLECTION_SLUG_USER } from './config'
import { ADMIN_ACCESS_ROLES } from '@/payload/plugins/authjs/auth.config'
import { isAdminOrCurrentUser, isAdmin } from '../fields/permissions/accessEvaluations'

const ADMIN_AUTH_GROUP = 'Auth'

export const users: CollectionConfig = {
  slug: COLLECTION_SLUG_USER,
  admin: {
    group: ADMIN_AUTH_GROUP,
    useAsTitle: 'email',
  },
  access: {
    admin: async ({ req }) => req?.user?.roles?.includes(ADMIN_ACCESS_ROLES) == true,
    read: isAdminOrCurrentUser,
    create: isAdmin,
    update: isAdminOrCurrentUser,
    delete: isAdminOrCurrentUser,
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'roles',
      type: 'json',
      typescriptSchema: [
        () => ({
          type: 'array',
          items: {
            type: 'string',
          },
        }),
      ],
    },
    {
      name: 'subscription',
      type: 'join',
      collection: COLLECTION_SLUG_SUBSCRIPTIONS,
      on: 'user',
      hasMany: false,
    },
    { name: 'stripeCustomerId', type: 'text', admin: { readOnly: true, position: 'sidebar' } },
  ],
} as const
