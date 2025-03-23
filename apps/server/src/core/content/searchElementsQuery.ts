'use server'

import { getPayload } from '@/payload/utils/getPayload'
import { evaluateExpression } from 'hegel'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { evalPermissionByRoleQuery } from '../auth/permissions/evalPermissionByRoleQuery'

export type SearchCollection = 'article_web' | 'quote' | 'book' | 'video'

export type SearchResult = {
  collection: SearchCollection
  id: number
  title: string
  href?: string
  tags: string[]
}

const createQueryCondition = (query: string) => {
  if (!query) return {}

  const titleCondition = { title: { like: query } }
  const tagsCondition = { tags: { like: query } }
  const titleWordConditions = query.split(' ').map((word) => ({ title: { like: word } }))
  const tagsWordConditions = query.split(' ').map((word) => ({ tags: { like: word } }))

  return {
    where: {
      and: [
        {
          or: [
            titleCondition,
            tagsCondition,
            { and: titleWordConditions },
            { and: tagsWordConditions },
          ],
        },
      ],
    },
  }
}

const filterByCollections =
  (collections: SearchCollection[], filterExpression?: string | null) => (result: any) => {
    const isInCollection = collections.includes(result.doc?.relationTo)

    if (!filterExpression) return isInCollection

    const tags = result.tags?.split(' ').filter(Boolean) ?? []
    return isInCollection && evaluateExpression(filterExpression, tags)
  }

const mapToSearchResult =
  (user: any) =>
  (result: any): SearchResult => ({
    collection: result.doc.relationTo,
    href: evalPermissionByRoleQuery(user, result.permissions_seeds?.trim() ?? '')
      ? (result.href ?? '#')
      : undefined,
    id: result.doc.value as number,
    title: result.title ?? '',
    tags: result.tags?.split(' ').filter(Boolean) ?? [],
  })

const paginateResults = (results: SearchResult[], page: number, limit?: number) => {
  if (!limit) return { results, lastPage: 0 }

  const startIndex = page * limit
  const endIndex = startIndex + limit
  const paginatedResults = results.slice(startIndex, endIndex)
  const lastPage = Math.ceil(results.length / limit)

  return { results: paginatedResults, lastPage }
}

export const searchElementsQuery = async (
  query: string,
  collections: SearchCollection[],
  page: number = 0,
  filterExpression?: string | null,
  limit?: number,
): Promise<{ results: SearchResult[]; lastPage: number }> => {
  const payload = await getPayload()
  const user = await getCurrentUserQuery(payload)

  const searchResults = await payload.find({
    collection: 'search-results',
    depth: 1,
    select: {
      title: true,
      doc: true,
      href: true,
      permissions_seeds: true,
      tags: true,
    },
    sort: '-priority',
    pagination: false,
    ...createQueryCondition(query),
  })

  const filteredResults = searchResults.docs
    .filter(filterByCollections(collections, filterExpression))
    .map(mapToSearchResult(user))

  return paginateResults(filteredResults, page, limit)
}
