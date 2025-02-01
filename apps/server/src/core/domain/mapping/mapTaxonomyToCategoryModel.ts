import { CategoryModel } from 'hegel'
import { Taxonomy } from 'payload-types'

export const mapTaxonomyToCategoryModel = (taxonomy: Taxonomy): CategoryModel => ({
  id: taxonomy.id,
  slug: taxonomy.slug,
  label: taxonomy.singular_name,
  breadcrumb:
    taxonomy.breadcrumbs?.findLast((i) => i.url?.includes(taxonomy.slug ?? ''))?.url ?? '',
})
