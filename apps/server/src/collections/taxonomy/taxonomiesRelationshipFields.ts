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
      type: 'json',
      typescriptSchema: [
        () => ({
          type: "array",
          items: {
            type: "string",
          },
        }),
      ],
      required: false,
      defaultValue: [],
      admin: { position: 'sidebar', readOnly: true },
    }
  ]
}

const populateSeedArrayHook: (props: TaxonomyBuilderProps) => CollectionBeforeChangeHook = (props) => async ({ data, req }) => {
  if (data[props.relationship.name].length === 0)
    return {
      ...data,
      [props.seeds.name]: [],
    }
  const taxonomies = await req.payload.find({
    collection: COLLECTION_SLUG_TAXONOMY,
    where: { id: { in: data[props.relationship.name] } },
  })

  const seeds = taxonomies.docs
    .mapNotNull((taxonomy) => taxonomy.seed)

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
