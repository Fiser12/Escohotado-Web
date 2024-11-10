import {
  isAdmin,
  isAdminOrStripeActive,
  isAdminOrUserFieldMatchingCurrentUser,
} from '@/utils/access'
import {
  COLLECTION_SLUG_PRICES,
  COLLECTION_SLUG_PRODUCTS,
  COLLECTION_SLUG_SUBSCRIPTIONS,
  COLLECTION_SLUG_TAXONOMY,
  COLLECTION_SLUG_USER,
} from '../config'
import { CollectionConfig } from 'payload'
import { populatePricesHook } from './populatePricesHook'
import { taxonomiesRelationshipBuilder } from '../taxonomy/taxonomiesRelationshipFields'

const group = 'Stripe'

export const PricingType = {
  one_time: 'One Time',
  recurring: 'Recurring',
} as const

export const PricingPlanInterval = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
  year: 'Year',
} as const

export const SubscriptionStatus = {
  trialing: 'Trialing',
  active: 'Active',
  canceled: 'Canceled',
  incomplete: 'Incomplete',
  incomplete_expired: 'Incomplete Expired',
  past_due: 'Past Due',
  unpaid: 'Unpaid',
  paused: 'Paused',
} as const

const formatOptions = (obj: Record<string, string>) =>
  Object.entries(obj).map(([key, value]) => ({ value: key, label: value }))

const permissionsRelationship = taxonomiesRelationshipBuilder({
  relationship: { 
    name: 'permissions', 
    label: 'Permisos',
    filterOptions: () => {
      return { seed: { like: "permissions/%" } }
    }
  },
  seeds: { name: 'seeds', label: 'Semillas de permisos' }
})

export const products: CollectionConfig = {
  slug: COLLECTION_SLUG_PRODUCTS,
  admin: {
    useAsTitle: 'name',
    group,
  },
  access: {
    read: isAdminOrStripeActive,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      permissionsRelationship.hook,
      populatePricesHook,
    ],
  },
  fields: [
    {
      name: 'stripeID',
      label: 'Stripe ID',
      type: 'text',
      required: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    { name: 'type', type: 'select', options: [
      { value: 'good', label: 'Bienes' }, 
      { value: 'service', label: 'Service' }
    ] },
    { name: 'active', type: 'checkbox', required: true, admin: { position: 'sidebar' } },
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'images', type: 'array', fields: [ { type: 'text', name: 'url' } ] },
    {
      name: 'prices',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_PRICES,
      hasMany: true,
      required: false,
    },
    { name: 'metadata', type: 'json', label: 'Metadata' },
    {
      type: 'array',
      name: 'features',
      fields: [ { type: 'text', name: 'title' } ],
    },
    ...permissionsRelationship.fields,
  ],
}

export const prices: CollectionConfig = {
  slug: COLLECTION_SLUG_PRICES,
  admin: {
    useAsTitle: 'unitAmount',
    group,
  },
  access: {
    read: isAdminOrStripeActive,
    create: () => false,
    update: () => false,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'stripeID',
      label: 'Stripe ID',
      type: 'text',
      required: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'stripeProductId',
      type: 'text',
      required: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    { name: 'product', type: 'join', collection: COLLECTION_SLUG_PRODUCTS, on: 'prices', hasMany: false },
    { name: 'active', type: 'checkbox', required: true, admin: { position: 'sidebar' } },
    { name: 'description', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'unitAmount', type: 'number', required: true },
        { name: 'currency', type: 'text', required: true },
        { name: 'type', type: 'select', options: formatOptions(PricingType), required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'interval', type: 'select', options: formatOptions(PricingPlanInterval) },
        { name: 'intervalCount', type: 'number' },
        { name: 'trialPeriodDays', type: 'number' },
      ],
    },
    { name: 'metadata', type: 'json', label: 'Metadata' }
  ],
}

export const subscriptions: CollectionConfig = {
  slug: COLLECTION_SLUG_SUBSCRIPTIONS,
  admin: { useAsTitle: 'id', group },
  access: {
    read: isAdminOrUserFieldMatchingCurrentUser,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
      label: 'Stripe',
      type: 'collapsible',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'stripeID', type: 'text', label: 'Stripe ID', admin: { readOnly: true }, required: true },
            { name: 'stripePriceID', type: 'text', label: 'Stripe Price ID', admin: { readOnly: true }, required: true },
            { name: 'stripeCustomerId', type: 'text', admin: { readOnly: true }, required: true },
          ],
        },
      ],
    },
    { name: 'metadata', type: 'json' },
  ],
}
