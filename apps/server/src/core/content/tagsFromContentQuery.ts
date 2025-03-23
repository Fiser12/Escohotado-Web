'use server'

import { getPayload } from '@/payload/utils/getPayload'
import { CategoryModel } from 'hegel'
import { collectionsContentsSlugs } from 'hegel/payload'
import { Taxonomy } from 'payload-types'
import { mapTaxonomyToCategoryModel } from '../domain/mapping/mapTaxonomyToCategoryModel'
import { withCache } from 'nextjs-query-cache'

type ContentCollection = (typeof collectionsContentsSlugs)[number]

const getQueryFieldKey = (collection: ContentCollection): string =>
  collection === 'quote' ? 'quote' : 'title'

const filterExcludedCategories =
  (excludeSeeds: string[]) =>
  (category: Taxonomy): boolean => {
    if (!excludeSeeds.length) return true

    return !excludeSeeds.some((seed) =>
      category.breadcrumbs?.some((breadcrumb) => breadcrumb.url?.includes(seed)),
    )
  }

const extractCategories = (category: Taxonomy): CategoryModel[] => {
  const result = mapTaxonomyToCategoryModel(category)
  return result ? [result] : []
}

export const tagsFromContentQuery = async (
  collection: ContentCollection,
  query: string,
  excludeSeeds: string[] = [],
): Promise<CategoryModel[]> => {
  const payload = await getPayload()
  const queryFieldKey = getQueryFieldKey(collection)

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

  return contentDocs.docs.flatMap((doc) => {
    const categories = doc.categories?.cast<Taxonomy>()

    if (!categories) return []

    return categories.filter(filterExcludedCategories(excludeSeeds)).flatMap(extractCategories)
  })
}

export const tagsFromContentQueryWithCache = withCache(tagsFromContentQuery)({
  days: 1,
  tags: ['taxonomies'],
})
