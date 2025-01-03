import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { BasePayload } from 'payload'

export const searchElementsQuery = async (
  query: string,
  collections: string[],
  basePayload?: BasePayload,
): Promise<{ collection: string; id: string }[]> => {
  const payload = basePayload ?? (await getPayload())
  const results = await payload.find({
    collection: 'search-results',
    depth: 1,
    select: {
      doc: true,
    },
    pagination: false,
    ...(query
      ? {
          where: {
            and: [
              {
                or: [{ title: { like: query } }, { tags: { like: query } }],
              },
            ],
          },
        }
      : {}),
  })
  return results.docs
    .filter((result) => collections.includes(result.doc?.relationTo))
    .map((result) => ({ collection: result.doc.relationTo, id: result.doc.value as string }))
}
