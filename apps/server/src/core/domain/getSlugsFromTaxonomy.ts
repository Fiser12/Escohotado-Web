import { Taxonomy } from 'payload-types'

export const getSlugsFromTaxonomy = (taxonomy: Taxonomy): string[] =>
  taxonomy.breadcrumbs?.mapNotNull((t) => t?.url?.split('/').filter((t) => t))?.flatMap((t) => t) ??
  []
