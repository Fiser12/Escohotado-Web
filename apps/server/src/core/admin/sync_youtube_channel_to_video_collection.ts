'use server'

import { COLLECTION_SLUG_VIDEO } from '../infrastructure/payload/collections/config'
import { payloadUpsert } from '../infrastructure/payload/utils/upsert'

interface YoutubeVideo {
  id: string
  url: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
  thumbnailUrl: string
}

interface YoutubeVideosResult {
  nextPageToken: string | null
  videos: YoutubeVideo[]
}

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
  const videos: YoutubeVideo[] = data.items.map((item: any) => {
    const snippet = item.snippet
    const thumbnailUrl =
      snippet.thumbnails.maxres?.url ??
      snippet.thumbnails.standard?.url ??
      snippet.thumbnails.high?.url ??
      snippet.thumbnails.medium?.url ??
      snippet.thumbnails.default?.url

    return {
      id: snippet.resourceId.videoId,
      url: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`,
      title: snippet.title,
      description: snippet.description,
      publishedAt: snippet.publishedAt,
      tags: snippet.tags || [],
      thumbnailUrl: thumbnailUrl,
    }
  })

  const nextPageToken = data.nextPageToken || null

  return {
    nextPageToken,
    videos,
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

  console.error(allVideos.map((video) => video.title))
  console.log('Videos sincronizados:', allVideos.length)
  return allVideos
}

const syncYoutubeChannelToVideoCollection = async () => {
  const videos = await getYoutubeVideos()
  const upsertPromises = videos.map((video) =>
    payloadUpsert({
      collection: COLLECTION_SLUG_VIDEO,
      data: {
        url: video.url,
        url_free: video.url,
        title: video.title,
        description: video.description,
        publishedAt: video.publishedAt,
        tags: video.tags,
        thumbnailUrl: video.thumbnailUrl,
      },
      where: {
        url: { equals: video.url },
      },
    }),
  )
  await Promise.all(upsertPromises)

  console.error('Sincronización completada.')
}

export default syncYoutubeChannelToVideoCollection
