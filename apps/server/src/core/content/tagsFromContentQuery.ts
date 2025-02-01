'use server'
import { getPayload } from '@/payload/utils/getPayload'
import { CategoryModel } from 'hegel'
import { collectionsContentsSlugs } from 'hegel/payload'
import { Taxonomy } from 'payload-types'
import { mapTaxonomyToCategoryModel } from '../domain/mapping/mapTaxonomyToCategoryModel'

export const tagsFromContentQuery = async (
  collection: (typeof collectionsContentsSlugs)[number],
  query: string,
  excludeSeeds: string[] = [],
): Promise<CategoryModel[]> => {
  const payload = await getPayload()
  const queryFieldKey = collection === 'quote' ? 'quote' : 'title'
  const contentDocs = await payload.find({
    collection: collection,
    pagination: false,
    select: {
      [queryFieldKey]: true,
      categories: true,
    },
    where: {
      [queryFieldKey]: { like: query },
    },
  })
  return (
    contentDocs.docs
      .map(
        (quote) =>
          quote.categories
            ?.cast<Taxonomy>()
            ?.filter(category =>
              !excludeSeeds.some(
                seed => category.breadcrumbs?.some(
                  breadcrumb => breadcrumb.url?.includes(seed)
                )
              )
            )
            ?.mapNotNull(mapTaxonomyToCategoryModel)
            ?.flat() ?? [],
      )
      ?.flat() ?? []
  )
}
