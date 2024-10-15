import type { CollectionConfig } from 'payload'

export function generateAccountsCollection(accountsCollectionSlug: string): CollectionConfig {
  const accountsCollection: CollectionConfig = {
    slug: accountsCollectionSlug,
    admin: {
      useAsTitle: 'id',
    },
    access: {
      read: () => true,
      create: () => false,
      update: () => false,
      delete: () => false,
    },
    fields: [
      {
        name: 'name',
        type: 'text',
      },
      {
        name: 'picture',
        type: 'text',
      },
      {
        name: 'user',
        type: 'relationship',
        admin: {
          position: 'sidebar',
        },
        hasMany: true,
        relationTo: "users",
      },
      {
        name: 'issuerName',
        type: 'text',
        required: true,
        label: 'Issuer Name',
      },
      {
        name: 'scope',
        type: 'text',
        required: true,
      },
      {
        name: 'sub',
        type: 'text',
        required: true,
      },
    ],
  }
  return accountsCollection
}
