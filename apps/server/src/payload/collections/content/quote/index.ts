import {
  COLLECTION_SLUG_ARTICLE_WEB,
  COLLECTION_SLUG_BOOK,
  COLLECTION_SLUG_QUOTE,
  COLLECTION_SLUG_VIDEO,
} from '@/core/collectionsSlugs'
import { CollectionConfig } from 'payload'
import { isAnyone, isAdmin } from 'payload-access-control'
import { taxonomyRelationship } from '@/payload/fields/taxonomies/taxonomiesRelationshipFields'

export const quoteOriginRelationTo = [
  COLLECTION_SLUG_BOOK,
  COLLECTION_SLUG_VIDEO,
  COLLECTION_SLUG_ARTICLE_WEB,
]

export const quote: CollectionConfig = {
  slug: COLLECTION_SLUG_QUOTE,
  labels: {
    singular: 'Cita',
    plural: 'Citas',
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'quote',
    group: 'Contenido',
  },
  hooks: {},
  fields: [
    {
      label: 'Cita',
      name: 'quote',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      label: 'Contexto',
      name: 'context',
      localized: true,
      type: 'text',
    },
    {
      label: 'Origen',
      name: 'source',
      type: 'relationship',
      relationTo: quoteOriginRelationTo,
      hasMany: false,
    },
    taxonomyRelationship,
  ],
}

type SourceField = typeof quoteOriginRelationTo
export type QuoteOrigenSlugs = SourceField[number]
