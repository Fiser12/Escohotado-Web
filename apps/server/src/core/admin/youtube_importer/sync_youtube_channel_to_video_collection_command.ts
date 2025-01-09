'use server'

import { BasePayload } from 'payload'
import { COLLECTION_SLUG_VIDEO } from '../../infrastructure/payload/collections/config'
import { getPayload } from '../../infrastructure/payload/utils/getPayload'
import { YoutubeVideo } from './youtube_video_model'
import 'hegel'
import { video as videoSchema } from '@/payload-generated-schema'
import { eq } from '@payloadcms/db-postgres/drizzle'

const getYoutubeVideos = async (
  playlistId: string = 'UUks2FdxaBZZFl4PTBAGz4Jw',
  uid: string = "19"
): Promise<YoutubeVideo[]> => {
  const apiUrl = new URL(`/api/v3/get-youtube-videos/${playlistId}`, process.env.FORUM_URL)
  const token = process.env.NODEBB_TOKEN
  const body = JSON.stringify({
    _uid: uid
  })

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Error creating topic: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }
  console.log(`Request success`)

  return await response.json() as YoutubeVideo[]
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

  const videos = await getYoutubeVideos()
  console.error('Videos: ', videos.length)
  const existingUrls = await getVideoURLsFromDatabase(payload)
  const upsertPromises = videos.map(async (video) =>
    await youtubeVideoUpsert(payload, video, existingUrls, upsert),
  )
  upsertPromises.forEach((promise) => promise.catch((error) => payload.logger.error('Error en el upsert: ', error)))
  await Promise.all(upsertPromises)
  payload.logger.warn('Sincronización completada.')
}

export default syncYoutubeChannelToVideoCollectionCommand
