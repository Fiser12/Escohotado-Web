import { isAdminOrStripeActive, isAdmin } from '@/utils/access'
import { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_PRICES, COLLECTION_SLUG_PRODUCTS } from '../config'

export const PricingType = {
  one_time: 'One Time',
  recurring: 'Recurring',
} as const

const formatOptions = (obj: Record<string, string>) =>
  Object.entries(obj).map(([key, value]) => ({ value: key, label: value }))

export const PricingPlanInterval = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
  year: 'Year',
} as const

export const prices: CollectionConfig = {
  slug: COLLECTION_SLUG_PRICES,
  admin: {
    useAsTitle: 'unitAmount',
    group: "Stripe",
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
    {
      name: 'product',
      type: 'join',
      collection: COLLECTION_SLUG_PRODUCTS,
      on: 'prices',
      hasMany: false,
    },
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
    { name: 'metadata', type: 'json', label: 'Metadata' },
  ],
}
