import type { CollectionConfig } from 'payload'
import { COLLECTION_SLUG_TAXONOMY } from '../config'
import { populateSeedHook } from './populateSeedHook'
import { v4 as uuid_v4 } from 'uuid'
import { isAnyone, isAdmin } from '../../fields/permissions/accessEvaluations'

const taxonomy: CollectionConfig = {
  slug: COLLECTION_SLUG_TAXONOMY,
  labels: {
    singular: 'Taxonomia',
    plural: 'Taxonomias',
  },
  access: {
    read: isAnyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'singular_name',
    group: 'Contenido'
  },
  hooks: {
    beforeChange: [populateSeedHook],
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      defaultValue: uuid_v4,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'selectable',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'slug',
      unique: true,
      type: 'text',
      required: true,
    },
    {
      name: 'singular_name',
      label: 'Nombre singular',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'plural_name',
      label: 'Nombre plural',
      type: 'text',
      localized: true,
      required: false,
    },
    {
      name: 'seed',
      type: 'text',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_TAXONOMY,
      hasMany: false,
      required: false,
    },
    {
      name: 'children',
      type: 'join',
      collection: COLLECTION_SLUG_TAXONOMY,
      on: 'parent',
    },
  ],
}

export default taxonomy
