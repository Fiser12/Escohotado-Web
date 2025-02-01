'use server'
import { getPayload } from '@/payload/utils/getPayload'
import { collectionsContentsSlugs } from 'hegel/payload'
import { Taxonomy } from 'payload-types'

export type TagModel = { 
  slug?: string | null; 
  label: string, 
  breadcrumb: string 
}

export const tagsFromContentQuery = async (
  collection: (typeof collectionsContentsSlugs)[number],
  query: string,
  excludeSeeds: string[] = []

): Promise<TagModel[]> => {
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
            ?.filter((category) => !excludeSeeds.some((seed) => category.breadcrumbs?.some((breadcrumb) => breadcrumb.url?.includes(seed))))
            ?.mapNotNull((category) => ({
              slug: category.slug,
              label: category.singular_name,
              breadcrumb: category.breadcrumbs?.findLast(i => i.url?.includes(category.slug ?? ""))?.url ?? "",
            }))
            ?.flat() ?? [],
      )
      ?.flat() ?? []
  )
}
