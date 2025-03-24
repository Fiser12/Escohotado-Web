'use server'

import { getPayload } from '@/payload/utils/getPayload'
import { evaluateExpression } from 'hegel'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'
import { evalPermissionByRoleQuery } from 'payload-access-control'
import { User } from 'payload-types'

export type SearchCollection = 'article_web' | 'quote' | 'book' | 'video'

export type SearchResult = {
  collection: SearchCollection
  id: number
  title: string
  href?: string
  tags: string[]
}

// Tipado para los documentos recibidos directamente del payload
interface PayloadDoc {
  id: number
  title?: string | null
  doc?: {
    relationTo: SearchCollection
    value: number | any // Payload puede devolver tanto el ID como el objeto completo
  }
  href?: string | null
  permissions_seeds?: string | null
  tags?: string | null
}

type QueryCondition = {
  where?: {
    and: Array<{
      or: Array<
        | { title: { like: string } }
        | { tags: { like: string } }
        | { and: Array<{ title: { like: string } }> }
        | { and: Array<{ tags: { like: string } }> }
      >
    }>
  }
}

const createQueryCondition = (query: string): QueryCondition => {
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

const filterByCollections = (collections: SearchCollection[], filterExpression?: string | null) => {
  return (result: PayloadDoc): boolean => {
    if (!result.doc) return false

    const isInCollection = collections.includes(result.doc.relationTo)

    if (!filterExpression) return isInCollection

    const tags = result.tags?.split(' ').filter(Boolean) ?? []
    return isInCollection && evaluateExpression(filterExpression, tags)
  }
}

const mapToSearchResult = (user: User | null) => {
  return (result: PayloadDoc): SearchResult => {
    if (!result.doc) {
      throw new Error('Invalid search result: missing doc field')
    }

    return {
      collection: result.doc.relationTo,
      href: evalPermissionByRoleQuery(user, result.permissions_seeds?.trim() ?? '')
        ? (result.href ?? '#')
        : undefined,
      id: result.doc.value as number,
      title: result.title ?? '',
      tags: result.tags?.split(' ').filter(Boolean) ?? [],
    }
  }
}

type PaginationResult = {
  results: SearchResult[]
  lastPage: number
}

const paginateResults = (
  results: SearchResult[],
  page: number,
  limit?: number,
): PaginationResult => {
  if (!limit) return { results, lastPage: 0 }

  const startIndex = page * limit
  const paginatedResults = results.slice(startIndex, startIndex + limit)
  const lastPage = Math.ceil(results.length / limit)

  return { results: paginatedResults, lastPage }
}

export const searchElementsQuery = async (
  query: string,
  collections: SearchCollection[],
  page: number = 0,
  filterExpression?: string | null,
  limit?: number,
): Promise<PaginationResult> => {
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

  const filterFn = filterByCollections(collections, filterExpression)
  const mapFn = mapToSearchResult(user)

  const filteredResults = searchResults.docs
    .filter((doc) => filterFn(doc as PayloadDoc))
    .map((doc) => mapFn(doc as PayloadDoc))

  return paginateResults(filteredResults, page, limit)
}
