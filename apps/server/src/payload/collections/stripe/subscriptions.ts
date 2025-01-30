import { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import {
  COLLECTION_SLUG_SUBSCRIPTIONS,
  COLLECTION_SLUG_USER,
  COLLECTION_SLUG_PRODUCTS,
} from 'hegel/payload'
import { isAdminOrUserFieldMatchingCurrentUser, isAdmin } from '../../fields/permissions/accessEvaluations'

const SubscriptionStatus = {
  trialing: 'Trialing',
  active: 'Active',
  canceled: 'Canceled',
  incomplete: 'Incomplete',
  incomplete_expired: 'Incomplete Expired',
  past_due: 'Past Due',
  unpaid: 'Unpaid',
  paused: 'Paused',
} as const

const updateSeedFromProduct: CollectionBeforeChangeHook = async (props) => {
  const product = await props.req.payload.findByID({
    collection: COLLECTION_SLUG_PRODUCTS,
    id: props.data.product,
  })
  props.data.permissions_seeds = product.permissions_seeds
}

const formatOptions = (obj: Record<string, string>) =>
  Object.entries(obj).map(([key, value]) => ({ value: key, label: value }))

export const subscriptions: CollectionConfig = {
  slug: COLLECTION_SLUG_SUBSCRIPTIONS,
  admin: { 
    useAsTitle: 'id', 
    group: "Stripe",
  },
  access: {
    read: isAdminOrUserFieldMatchingCurrentUser,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [updateSeedFromProduct]
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'user', type: 'relationship', relationTo: COLLECTION_SLUG_USER, required: true },
        {
          name: 'product',
          type: 'relationship',
          relationTo: COLLECTION_SLUG_PRODUCTS,
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          options: formatOptions(SubscriptionStatus),
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'created', type: 'date', admin: { readOnly: true } },
        { name: 'currentPeriodStart', type: 'date', admin: { readOnly: true } },
        { name: 'currentPeriodEnd', type: 'date', admin: { readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'endedAt', type: 'date', admin: { readOnly: true } },
        { name: 'cancelAt', type: 'date', admin: { readOnly: true } },
        { name: 'canceledAt', type: 'date', admin: { readOnly: true } },
        { name: 'cancelAtPeriodEnd', type: 'checkbox', admin: { readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'trialStart', type: 'date', admin: { readOnly: true } },
        { name: 'trialEnd', type: 'date', admin: { readOnly: true } },
      ],
    },
    {
      label: 'Stripe Ids',
      type: 'collapsible',
      admin: { readOnly: true, position: 'sidebar' }, 
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'stripeID',
              type: 'text',
              label: 'Stripe ID',
              admin: { readOnly: true },
              required: true,
            },
            {
              name: 'stripePriceID',
              type: 'text',
              label: 'Stripe Price ID',
              admin: { readOnly: true },
              required: true,
            },
            { name: 'stripeCustomerId', type: 'text', admin: { readOnly: true }, required: true },
          ],
        },
      ],
    },
    { name: 'metadata', type: 'json', admin: { readOnly: true } },
    { 
      name: 'permissions_seeds', 
      label: 'Semilla de permisos', 
      type: 'text',
      admin: { readOnly: true, position: 'sidebar' }, 
      defaultValue: ""
    },
  ],
}
