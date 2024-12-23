import { COLLECTION_SLUG_VIDEO } from '@/core/infrastructure/payload/collections/config'
import { getPayload } from '@/core/infrastructure/payload/utils/getPayload'
import { Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'

const pageSize = 20

export const getVideosQuery = async (
  query: string,
  page: number,
): Promise<{
  results: Video[]
  maxPage: number
}> => {
  const results = (await searchElementsQuery(query, [COLLECTION_SLUG_VIDEO])).map((item) => item.id)
  const payload = await getPayload()
  const videosDocs = await payload.find({
    collection: COLLECTION_SLUG_VIDEO,
    sort: '-publishedAt',
    pagination: false,
    where: {
      id: { in: results },
    },
  })
  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize

  let videos = videosDocs.docs

  return {
    results: videos.slice(startIndex, endIndex),
    maxPage: Math.ceil(videos.length / pageSize),
  }
}
