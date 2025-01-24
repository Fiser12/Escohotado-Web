import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB, COLLECTION_SLUG_BOOK, COLLECTION_SLUG_QUOTE, COLLECTION_SLUG_VIDEO } from '../../config'
import { CollectionConfig } from 'payload'
import { isAnyone, isAdmin } from '@/payload/fields/permissions/accessEvaluations'
import { taxonomyRelationship } from '@/payload/fields/taxonomies/taxonomiesRelationshipFields'

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
      group: 'Contenido'
    },
    hooks: {
    },
    fields: [
      {
        label: 'Cita',
        name: 'quote',
        type: 'textarea',
        required: true
      },
      {
        label: 'Contexto',
        name: 'context',
        type: 'text'
      },
      {
        label: 'Origen',
        name: 'source',
        type: 'relationship',
        relationTo: [COLLECTION_SLUG_BOOK, COLLECTION_SLUG_VIDEO, COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_ARTICLE_WEB],
        hasMany: false
      },
      taxonomyRelationship,
    ]
}