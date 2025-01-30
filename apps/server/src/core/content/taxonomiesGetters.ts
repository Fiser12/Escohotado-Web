import { Taxonomy } from "payload-types";


export const getAuthorFromTaxonomies = (taxonomies: Taxonomy[]): Taxonomy | undefined => (
    taxonomies?.find(taxonomy => taxonomy.breadcrumbs?.some(b => b.url?.includes("autor")) == true)
)

export const getAuthorsNamesFromTaxonomies = (taxonomies: Taxonomy[]): string => {
    return taxonomies
      .filter(taxonomy => taxonomy.breadcrumbs?.some(b => b.url?.includes("autor")) == true)
      .map((taxonomy) => taxonomy.singular_name)
      .join(', ')
}

export const getMediasFromTaxonomies = (
  taxonomies: Taxonomy[],
): { id: string; singular_name: string }[] => {
  return taxonomies
  .filter(taxonomy => taxonomy.breadcrumbs?.some(b => b.url?.includes("medio")) == true)
  .map((taxonomy) => ({ id: taxonomy.id, singular_name: taxonomy.singular_name }))
}

export const getTopicsFromTaxonomies = (
  taxonomies: Taxonomy[],
): { id: string; singular_name: string }[] => {
  return taxonomies
  .filter(taxonomy => taxonomy.breadcrumbs?.some(b => b.url?.includes("tema")) == true)
  .map((taxonomy) => ({ id: taxonomy.id, singular_name: taxonomy.singular_name }))
}

export const getSelectableTaxonomies = (
  taxonomies: Taxonomy[],
): { id: string; singular_name: string }[] => {
  return taxonomies
  .filter(taxonomy => taxonomy.selectable == true)
  .map((taxonomy) => ({ id: taxonomy.id, singular_name: taxonomy.singular_name }))
}

