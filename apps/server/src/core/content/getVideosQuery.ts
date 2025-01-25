'use server'
import { COLLECTION_SLUG_VIDEO } from '@/payload/collections/config'
import { getPayload } from '@/payload/utils/getPayload'
import { Video } from 'payload-types'
import { searchElementsQuery } from './searchElementsQuery'
import { fetchPermittedContentQuery } from '../auth/permissions/fetchPermittedContentQuery'
import { getCurrentUserQuery } from '../auth/payloadUser/getCurrentUserQuery'

const pageSize = 20

export type ResultVideo = Video & {
  allowedHref: string | null
}

export const getVideosQuery = async (
  query: string,
  tags: string,
  page: number,
  sortBy: string
): Promise<{
  results: ResultVideo[]
  maxPage: number
}> => {
  const results = (await searchElementsQuery(query, [COLLECTION_SLUG_VIDEO])).map((item) => item.id)
  const payload = await getPayload()
  const user = await getCurrentUserQuery(payload)
  const filterTags = tags.split(',')

  const videosDocs = await payload.find({
    collection: COLLECTION_SLUG_VIDEO,
    sort: sortBy === "popularity" ? "-viewCount" : '-publishedAt',
    pagination: false,
    where: {
      id: { in: results }
    },
  })
  const startIndex = page * pageSize
  const endIndex = startIndex + pageSize

  let videos = videosDocs.docs.map((video) => {
    const allowedHref = fetchPermittedContentQuery(
      user,
      video.permissions_seeds ?? '',
      video.url,
      video.url_free,
    )

    return {
      ...video,
      allowedHref,
    }
  })
  .filter((video) => {
    const videoTags = (video.tags ?? []) as string[]
    if (tags) {
      return videoTags.some((tag) => filterTags.includes(tag))
    }
    return true
  })

  return {
    results: videos.slice(startIndex, endIndex),
    maxPage: Math.ceil(videos.length / pageSize),
  }
}
