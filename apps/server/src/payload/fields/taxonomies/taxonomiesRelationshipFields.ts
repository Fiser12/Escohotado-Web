import { Field } from 'payload'
import 'hegel'
import { COLLECTION_SLUG_TAXONOMY } from 'hegel/payload'
import { slugField } from '../slug'

export const taxonomyRelationship: Field = {
  name: 'categories',
  label: 'Categorías',
  type: 'relationship',
  relationTo: COLLECTION_SLUG_TAXONOMY,
  defaultValue: [],
  hasMany: true,
  required: false,
}
