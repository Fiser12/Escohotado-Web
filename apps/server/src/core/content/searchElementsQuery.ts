"use server";

import { getPayload } from '@/payload/utils/getPayload'
import { BasePayload } from 'payload'

type SearchCollection = "article_pdf" | "article_web" | "quote" | "book" | "video"
type SearchResult = { collection: SearchCollection; id: string, title: string, href: string, tags: string[] }

export const searchElementsQuery = async (
  query: string,
  collections: SearchCollection[],
  basePayload?: BasePayload,
  limit?: number
): Promise<SearchResult[]> => {
  const payload = basePayload ?? (await getPayload())
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
    limit,
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
  return results.docs
    .filter((result) => collections.includes(result.doc?.relationTo))
    .map((result) => ({ 
      collection: result.doc.relationTo, 
      href: result.href ?? "#",
      id: result.doc.value as string, 
      title: result.title ?? "",
      tags: result.tags?.split(" ").filter(Boolean) ?? [] 
    }
  ))
}
