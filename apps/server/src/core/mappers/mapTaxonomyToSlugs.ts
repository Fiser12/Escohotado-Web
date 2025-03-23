import { Taxonomy } from 'payload-types'

export const mapTaxonomyToSlugs = (taxonomy: Taxonomy): string[] =>
  taxonomy.breadcrumbs?.mapNotNull((t) => t?.url?.split('/').filter((t) => t))?.flatMap((t) => t) ??
  []
