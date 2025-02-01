import { CategoryModel } from "hegel";
import { Taxonomy } from "payload-types";
import { mapTaxonomyToCategoryModel } from "../domain/mapping/mapTaxonomyToCategoryModel";


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
): CategoryModel[] => {
  return taxonomies
  .filter(taxonomy => taxonomy.breadcrumbs?.some(b => b.url?.includes("medio")) == true)
  .map(mapTaxonomyToCategoryModel)
}

export const getTopicsFromTaxonomies = (
  taxonomies: Taxonomy[],
): CategoryModel[] => {
  return taxonomies
  .filter(taxonomy => taxonomy.breadcrumbs?.some(b => b.url?.includes("tema")) == true)
  .map(mapTaxonomyToCategoryModel)
}

export const getSelectableTaxonomies = (
  taxonomies: Taxonomy[],
): CategoryModel[] => {
  return taxonomies
  .filter(taxonomy => taxonomy.selectable == true)
  .map(mapTaxonomyToCategoryModel)
}

