'use server'

import 'hegel'

import { BasePayload } from 'payload'
import { YoutubeVideo } from './youtube_video_model'
import { getPayload } from '@/payload/utils/getPayload'
import { COLLECTION_SLUG_VIDEO, routes } from 'hegel/payload'

const getYoutubeVideos = async (
  playlistId: string = 'UUks2FdxaBZZFl4PTBAGz4Jw',
  uid: string = '19',
): Promise<YoutubeVideo[]> => {
  const apiUrl = new URL(routes.nodeBB.getYoutubeVideosApi(playlistId))
  const token = process.env.NODEBB_TOKEN
  const body = JSON.stringify({
    _uid: uid,
  })

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Error creating topic: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }
  console.log(`Request success`)

  return (await response.json()) as YoutubeVideo[]
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
    const url = `https://www.youtube.com/watch?v=${video.id}`
    if (upsert && existingUrls.includes(url)) {
      await payload.update({
        collection: 'video',
        data: {
          title: video.title,
          publishedAt: video.publishedAt,
          tags: video.tags,
          thumbnailUrl: video.thumbnailUrl,
          viewCount: Number(video.viewCount),
          duration: Number(parseISODurationToSeconds(video.duration)),
        },
        where: { url: { equals: url } },
      })

      payload.logger.warn(`Video updated: ${video.id}: ${video.title}`)
      return
    }
    if (existingUrls.includes(url)) return

    await payload.create({
      collection: 'video',
      data: {
        url: url,
        url_free: url,
        title: video.title,
        publishedAt: video.publishedAt,
        tags: video.tags,
        thumbnailUrl: video.thumbnailUrl,
        viewCount: Number(video.viewCount),
        duration: Number(parseISODurationToSeconds(video.duration)),
      },
    })

    payload.logger.warn(`Video created: ${video.id}: ${video.title}`)
  } catch (error) {
    payload.logger.error(`Error in payloadUpsert: ${error}`)
  }
}
function parseISODurationToSeconds(isoDuration: string): string {
  const regex = /P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/
  const match = isoDuration.match(regex)

  if (!match) throw new Error('Formato de duración no válido.')

  const hours = parseInt(match[1] || '0', 10)
  const minutes = parseInt(match[2] || '0', 10)
  const seconds = parseInt(match[3] || '0', 10)

  return String(hours * 3600 + minutes * 60 + seconds)
}

const syncYoutubeChannelToVideoCollectionCommand = async (upsert: boolean) => {
  const payload = await getPayload()
  payload.logger.warn(`Starting sync of Youtube channel to video collection`)

  const videos = await getYoutubeVideos()
  const existingUrls = await getVideoURLsFromDatabase(payload)
  const chunkArray = <T>(arr: T[], size: number): T[][] => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const videoBatches: YoutubeVideo[][] = chunkArray(videos, 20);

  for (const batch of videoBatches) {
    const upsertPromises = batch.map(async (video) => 
      await youtubeVideoUpsert(payload, video, existingUrls, upsert)
    );
    
    try {
      await Promise.all(upsertPromises);
    } catch (error) {
      payload.logger.error('Error en el upsert por lotes: ', error);
    }
  }

  payload.logger.warn('Sincronización completada.');

}

export default syncYoutubeChannelToVideoCollectionCommand
