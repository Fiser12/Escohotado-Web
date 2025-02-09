import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_SUBSCRIPTIONS, COLLECTION_SLUG_USER } from 'hegel/payload'
import { isAdminOrCurrentUser, isAdmin } from '@/payload/fields/permissions/accessEvaluations'
import { User } from 'payload-types'
import syncNewsletterSubscription from '@/core/newsletter/syncNewsletterSubscription'
import { permissionSlugs } from 'hegel'

const ADMIN_AUTH_GROUP = 'Auth'

export const users: CollectionConfig = {
  slug: COLLECTION_SLUG_USER,
  admin: {
    group: ADMIN_AUTH_GROUP,
    useAsTitle: 'email',
  },
  access: {
    admin: async ({ req }) => req?.user?.roles?.includes(permissionSlugs.webAdmin) == true,
    read: isAdminOrCurrentUser,
    create: isAdmin,
    update: isAdminOrCurrentUser,
    delete: isAdminOrCurrentUser,
  },
  fields: [
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
      label: 'Subscripción a la newsletter',
      name: "isSubscribedToNewsletter",
      type: "checkbox",
      required: true,
      defaultValue: true,
      hooks: {
        afterChange: [
          async ({ data, previousDoc }): Promise<void> => {
            if(!data 
              || !data.email
              || data.isSubscribedToNewsletter === previousDoc.isSubscribedToNewsletter 
            ) return

            await syncNewsletterSubscription({
              email: data.email, 
              name: data.name , 
              isSubscribedToNewsletter: data.isSubscribedToNewsletter
            })
          }
        ]
      }
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

