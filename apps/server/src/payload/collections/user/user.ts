import type { CollectionConfig } from 'payload'
import { isAdminOrCurrentUser, isAdmin, permissionSlugs } from 'payload-access-control'
import syncNewsletterSubscription from '@/core/newsletter/syncNewsletterSubscription'
import { COLLECTION_SLUG_USER } from '@/core/collectionsSlugs'

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
      name: 'isSubscribedToNewsletter',
      type: 'checkbox',
      required: true,
      defaultValue: true,
      hooks: {
        afterChange: [
          async ({ data, previousDoc }): Promise<void> => {
            if (
              !data ||
              !data.email ||
              data.isSubscribedToNewsletter === previousDoc.isSubscribedToNewsletter
            )
              return

            await syncNewsletterSubscription({
              email: data.email,
              name: data.name,
              isSubscribedToNewsletter: data.isSubscribedToNewsletter,
            })
          },
        ],
      },
    },
    {
      name: 'inventory',
      type: 'json',
      admin: { readOnly: true },
    },
  ],
} as const
