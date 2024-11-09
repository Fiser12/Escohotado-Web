import { CollectionBeforeChangeHook, Field } from 'payload'
import { COLLECTION_SLUG_TAXONOMY } from '../config'

const taxonomiesRelationship: (additionalFields: Field[]) => Field[] = (additionalFields = []) => {
  return [
    {
      name: 'taxonomies',
      type: 'relationship',
      relationTo: COLLECTION_SLUG_TAXONOMY,
      defaultValue: [],
      hasMany: true,
      required: false,
    },
    {
      name: 'seeds',
      type: 'array',
      required: false,
      defaultValue: [],
      fields: [{ type: 'text', name: 'seed' }, ...additionalFields],
      admin: { position: 'sidebar', readOnly: true },
    },
  ]
}

const populateSeedArrayHook: CollectionBeforeChangeHook = async ({ data, req }) => {
  if (data.taxonomies.length === 0)
    return {
      ...data,
      seeds: [],
    }
  const taxonomies = await req.payload.find({
    collection: COLLECTION_SLUG_TAXONOMY,
    where: { id: { in: data.taxonomies } },
  })
  return {
    ...data,
    seeds: taxonomies.docs
      .mapNotNull((taxonomy) => taxonomy.seed)
      .map((seed) => {
        return { seed: seed }
      }),
  }
}

type TaxonomyBuilderResult = {
  fields: Field[]
  hook: CollectionBeforeChangeHook
}

export const taxonomiesRelationshipBuilder = (
  additionalFields: Field[] = [],
): TaxonomyBuilderResult => {
  return {
    fields: taxonomiesRelationship(additionalFields),
    hook: populateSeedArrayHook,
  }
}
