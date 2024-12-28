'use server'

import { BasePayload } from 'payload'
import { COLLECTION_SLUG_VIDEO } from '../../infrastructure/payload/collections/config'
import { getPayload } from '../../infrastructure/payload/utils/getPayload'
import { mapApiYoutubeVideoToModel } from './mapApiYoutubeVideoToModel'
import { YoutubeVideo, YoutubeVideosResult } from './youtube_video_model'
import 'hegel'
import { video as videoSchema } from '@/payload-generated-schema'
import { eq } from '@payloadcms/db-postgres/drizzle'

const getYoutubeVideosByPage = async (
  playlistId: string = 'PLggf90VSN9KOwkevFKymkO4tsS2LeZl6O',
  pageToken: string | null = null,
): Promise<YoutubeVideosResult> => {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    throw new Error('No API Key found in environment variables.')
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&playlistId=${playlistId}${pageToken ? `&pageToken=${pageToken}` : ''}&maxResults=50&part=snippet,contentDetails,status`

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
  payload: BasePayload,
  playlistId: string = 'UUks2FdxaBZZFl4PTBAGz4Jw',
): Promise<YoutubeVideo[]> => {
  try {
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
    payload.logger.warn(`Videos loaded from api: ${allVideos.length}`)

    return allVideos
  } catch (error) {
    payload.logger.error(`Error loading : ${error}`)
    throw error
  }
}

const getVideoURLsFromDatabase = async (payload: BasePayload): Promise<string[]> => {
  const collection = COLLECTION_SLUG_VIDEO
  const videos = await payload.find({
    collection,
    pagination: false,
    select: { url_free: true },
  })
  payload.logger.warn(`Videos loaded from database: ${videos.docs.length}`)

  return videos.docs.mapNotNull((video) => video.url_free)
}

export const youtubeVideoUpsert = async (
  payload: BasePayload,
  video: YoutubeVideo,
  existingUrls: string[],
  upsert: boolean,
): Promise<void> => {  
  try {
    if (upsert && existingUrls.includes(video.url)) {
      await payload.db.drizzle
        .update(videoSchema)
        .set(
          {
            title: video.title,
            description: video.description,
            publishedAt: video.publishedAt,
            tags: video.tags,
            thumbnailUrl: video.thumbnailUrl,
          }
        )
        .where(eq(videoSchema.url, video.url))
        .execute()

      payload.logger.warn(`Video updated: ${video.id}: ${video.title}`)
      return
    }
    if (existingUrls.includes(video.url)) return

    await payload.db.drizzle
      .insert(videoSchema)
      .values(
        {
          url: video.url,
          url_free: video.url,
          title: video.title,
          description: video.description,
          publishedAt: video.publishedAt,
          tags: video.tags,
          thumbnailUrl: video.thumbnailUrl,
        }
      )
      .execute()
  
    payload.logger.warn(`Video created: ${video.id}: ${video.title}`)
  } catch (error) {
    payload.logger.error(`Error in payloadUpsert: ${error}`)
  }
}

const syncYoutubeChannelToVideoCollectionCommand = async (upsert: boolean) => {
  const payload = await getPayload()
  payload.logger.warn(`Starting sync of Youtube channel to video collection`)

  const videos = await getYoutubeVideos(payload)
  const existingUrls = await getVideoURLsFromDatabase(payload)
  const upsertPromises = videos.map((video) =>
    youtubeVideoUpsert(payload, video, existingUrls, upsert),
  )
  upsertPromises.forEach((promise) => promise.catch((error) => payload.logger.error('Error en el upsert: ', error)))
  await Promise.all(upsertPromises)
  payload.logger.warn('Sincronización completada.')
}

export default syncYoutubeChannelToVideoCollectionCommand
