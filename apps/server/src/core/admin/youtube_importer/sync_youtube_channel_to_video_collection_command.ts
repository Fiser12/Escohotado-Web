'use server'

import { COLLECTION_SLUG_VIDEO } from '../../infrastructure/payload/collections/config'
import { getPayload } from '../../infrastructure/payload/utils/getPayload'
import { mapApiYoutubeVideoToModel } from './mapApiYoutubeVideoToModel'
import { YoutubeVideo, YoutubeVideosResult } from './youtube_video_model'

const getYoutubeVideosByPage = async (
  playlistId: string = 'UUks2FdxaBZZFl4PTBAGz4Jw',
  pageToken: string | null = null,
): Promise<YoutubeVideosResult> => {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    throw new Error('No API Key found in environment variables.')
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}${pageToken ? `&pageToken=${pageToken}` : ''}&maxResults=50&part=snippet`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Error fetching YouTube videos: ${response.statusText}`)
  }

  const data = await response.json()

  return {
    nextPageToken: data.nextPageToken || null,
    videos: data.items.map(mapApiYoutubeVideoToModel),
  }
}

const getYoutubeVideos = async (
  playlistId: string = 'UUks2FdxaBZZFl4PTBAGz4Jw',
): Promise<YoutubeVideo[]> => {
  let nextPageToken: string | null = null
  let allVideos: YoutubeVideo[] = []

  do {
    const { nextPageToken: newPageToken, videos } = await getYoutubeVideosByPage(
      playlistId,
      nextPageToken,
    )
    allVideos = [...allVideos, ...videos]
    nextPageToken = newPageToken
  } while (nextPageToken)

  console.error(allVideos.map((video) => video.url))
  console.log('Videos sincronizados:', allVideos.length)
  return allVideos
}

export const youtubeVideoUpsert = async (video: YoutubeVideo): Promise<void> => {
  const payload = await getPayload()
  const collection = COLLECTION_SLUG_VIDEO
  let existingDocId: string | undefined
  try {
    const existingDocs = await payload.find({
      collection,
      where: { url_free: { equals: video.url } },
      pagination: false,
      limit: 1,
    })

    existingDocId = existingDocs.docs?.at(0)?.id
    if (existingDocId) {
      await payload.update({
        collection,
        data: {
          title: video.title,
          description: video.description,
          publishedAt: video.publishedAt,
          tags: video.tags,
          thumbnailUrl: video.thumbnailUrl,
        },
        where: { url_free: { equals: video.url } },
        context: {
          triggerAfterChange: false,
        },
      })
      return
    }

    await payload.create({
      collection,
      data: {
        url: video.url,
        url_free: video.url,
        title: video.title,
        description: video.description,
        publishedAt: video.publishedAt,
        tags: video.tags,
        thumbnailUrl: video.thumbnailUrl,
      },
      context: {
        triggerAfterChange: false,
      },
    })
  } catch (error) {
    console.error(`Existing previous doc id: ${existingDocId ?? "No previous doc"}`)
    console.error(`Error in payloadUpsert: ${error}`)
  }
}

const syncYoutubeChannelToVideoCollectionCommand = async () => {
  const videos = await getYoutubeVideos()
  const upsertPromises = videos.map((video) =>
    youtubeVideoUpsert(video).catch((error) => {
      console.error(`Error upserting video: ${video.title}`, error)
    }),
  )
  await Promise.all(upsertPromises)

  console.error('Sincronización completada.')
}

export default syncYoutubeChannelToVideoCollectionCommand

