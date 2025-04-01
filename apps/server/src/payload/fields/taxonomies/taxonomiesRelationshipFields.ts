import { COLLECTION_SLUG_TAXONOMY } from '@/core/collections-slugs'
import 'hegel'
import { Field } from 'payload'

export const taxonomyRelationship: Field = {
  name: 'categories',
  label: 'Categorías',
  type: 'relationship',
  relationTo: COLLECTION_SLUG_TAXONOMY,
  defaultValue: [],
  hasMany: true,
  required: false,
}
