import { CollectionBeforeChangeHook, Field, FilterOptions } from 'payload'
import { COLLECTION_SLUG_TAXONOMY } from '../config'

interface TaxonomyBuilderProps {
    relationship: {
        name: string
        filterOptions?: FilterOptions
        label?: string
    },
    seeds: {
        name: string
        label?: string,
        additionalFields?: Field[]
    }
}

const taxonomiesRelationship: (props: TaxonomyBuilderProps) => Field[] = (props) => {
  return [
    {
      name: props.relationship.name,
      label: props.relationship.label || undefined,
      type: 'relationship',
      relationTo: COLLECTION_SLUG_TAXONOMY,
      filterOptions: props.relationship.filterOptions,
      defaultValue: [],
      hasMany: true,
      required: false,
    },
    {
      name: props.seeds.name,
      label: props.seeds.label || undefined,
      type: 'array',
      required: false,
      defaultValue: [],
      fields: [{ type: 'text', name: 'seed' }, ...(props.seeds.additionalFields ?? [])],
      admin: { position: 'sidebar', readOnly: true },
    },
  ]
}

const populateSeedArrayHook: (props: TaxonomyBuilderProps) => CollectionBeforeChangeHook = (props) => async ({ data, req }) => {
  if (data[props.relationship.name].length === 0)
    return {
      ...data,
      seeds: [],
    }
  const taxonomies = await req.payload.find({
    collection: COLLECTION_SLUG_TAXONOMY,
    where: { id: { in: data[props.relationship.name] } },
  })

  const seeds = taxonomies.docs
    .mapNotNull((taxonomy) => taxonomy.seed)
    .map((seed) => {
        return { seed: seed }
    })


  return {
    ...data,
    [props.seeds.name]: seeds,
  }
}

interface TaxonomyBuilderResult {
    fields: Field[]
    hook: CollectionBeforeChangeHook
}
  
  
export const taxonomiesRelationshipBuilder = (
  props: TaxonomyBuilderProps
): TaxonomyBuilderResult => {
  return {
    fields: taxonomiesRelationship(props),
    hook: populateSeedArrayHook(props),
  }
}
