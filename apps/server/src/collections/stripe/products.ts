import { isAdminOrStripeActive, isAdmin } from '@/utils/access'
import { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_PRODUCTS, COLLECTION_SLUG_PRICES } from '../config'
import { populatePricesHook } from './populatePricesHook'
import { taxonomiesRelationshipBuilder } from '../taxonomy/taxonomiesRelationshipFields'

export const permissionsRelationship = taxonomiesRelationshipBuilder({
  relationship: {
    name: 'permissions',
    label: 'Permisos',
    filterOptions: () => {
      return { seed: { like: 'permissions/%' } }
    },
  },
  seeds: { name: 'seeds', label: 'Semillas de permisos' },
})

export const products: CollectionConfig = {
  slug: COLLECTION_SLUG_PRODUCTS,
  admin: {
    useAsTitle: 'name',
    group: 'Stripe',
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
      populatePricesHook
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
    {
      name: 'type',
      type: 'select',
      options: [
        { value: 'good', label: 'Bienes' },
        { value: 'service', label: 'Service' },
      ],
    },
    { name: 'active', type: 'checkbox', required: true, admin: { position: 'sidebar' } },
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'images', type: 'array', fields: [{ type: 'text', name: 'url' }] },
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
      fields: [{ type: 'text', name: 'title' }],
    },
    ...permissionsRelationship.fields,
  ],
}
