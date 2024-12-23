'use server'

import { BasePayload } from 'payload'
import { COLLECTION_SLUG_VIDEO } from '../../infrastructure/payload/collections/config'
import { getPayload } from '../../infrastructure/payload/utils/getPayload'
import { mapApiYoutubeVideoToModel } from './mapApiYoutubeVideoToModel'
import { YoutubeVideo, YoutubeVideosResult } from './youtube_video_model'
import "hegel"

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

const getVideoURLsFromDatabase = async (payload: BasePayload): Promise<string[]> => {
  const collection = COLLECTION_SLUG_VIDEO
  const videos = await payload.find({
    collection,
    pagination: false,
    select: { url_free: true },
  })

  return videos.docs.mapNotNull((video) => video.url_free)
}

export const youtubeVideoUpsert = async (payload: BasePayload, video: YoutubeVideo, existingUrls: string[], upsert: boolean): Promise<void> => {
  const collection = COLLECTION_SLUG_VIDEO
  try {
    if (upsert && existingUrls.includes(video.url)) {
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
      payload.logger.info(`Video updated: ${video.id}: ${video.title}`)
      return
    }
    if(existingUrls.includes(video.url)) return

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
    payload.logger.info(`Video created: ${video.id}: ${video.title}`)
  } catch (error) {
    payload.logger.error(`Error in payloadUpsert: ${error}`)
  }
}

const syncYoutubeChannelToVideoCollectionCommand = async (upsert: boolean) => {
  const payload = await getPayload()
  const videos = await getYoutubeVideos()
  const existingUrls = await getVideoURLsFromDatabase(payload)
  const upsertPromises = videos.map((video) =>
    youtubeVideoUpsert(payload, video, existingUrls, upsert)
  )
  await Promise.all(upsertPromises)
  payload.logger.info('Sincronización completada.')
}

export default syncYoutubeChannelToVideoCollectionCommand

