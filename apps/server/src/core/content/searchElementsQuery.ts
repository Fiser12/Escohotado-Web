"use server";

import { getPayload } from '@/payload/utils/getPayload'
import { evaluateExpression } from 'hegel';

type SearchCollection = "article_pdf" | "article_web" | "quote" | "book" | "video"
type SearchResult = { collection: SearchCollection; id: string, title: string, href: string, tags: string[] }

export const searchElementsQuery = async (
  query: string,
  collections: SearchCollection[],
  page: number = 0,
  filterExpression?: string | null,
  limit?: number
): Promise<{results: SearchResult[], lastPage: number}> => {
  const payload = await getPayload()
  const results = await payload.find({
    collection: 'search-results',
    depth: 1,
    select: {
      title: true,
      doc: true,
      href: true,
      tags: true
    },
    sort: '-priority',
    pagination: false,
    ...(query
      ? {
          where: {
            and: [
              {
                or: [
                  { title: { like: query } }, 
                  { tags: { like: query } },
                  { and: query.split(" ").map((word) => ({ title: { like: word } })) },
                  { and: query.split(" ").map((word) => ({ tags: { like: word } })) }
                ],
              },
            ],
          },
        }
      : {}),
  })
  const resultsFiltered = results.docs
    .filter(result => {
      return collections.includes(result.doc?.relationTo) && 
      (filterExpression
        ? evaluateExpression(filterExpression, result.tags?.split(" ").filter(Boolean) ?? []) 
        : true
      )
    }
  ).map(result => ({ 
      collection: result.doc.relationTo, 
      href: result.href ?? "#",
      id: result.doc.value as string, 
      title: result.title ?? "",
      tags: result.tags?.split(" ").filter(Boolean) ?? [] 
    }
  ))

  if (!limit) return { results: resultsFiltered, lastPage: 0 }

  const startIndex = page * limit
  const endIndex = startIndex + limit

  return {
    results: resultsFiltered.slice(startIndex, endIndex),
    lastPage: Math.ceil(resultsFiltered.length / limit),
  }
}
