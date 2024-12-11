import { CollectionBeforeChangeHook } from 'payload'
import { extractYouTubeVideoId } from './extractYouTubeVideoId'

export interface YouTubeVideoMetadata {
  title: string
  description: string
  publishedAt: string
  tags: string[]
  thumbnailUrl: string
}

export const getYoutubeVideoMetadataHook: CollectionBeforeChangeHook = async ({ data }) => {
  return {
    ...data,
    ...(await getYouTubeVideoMetadata(data.url)),
  }
}

export async function getYouTubeVideoMetadata(
  videoUrl: string,
): Promise<YouTubeVideoMetadata | null> {
  const videoId = extractYouTubeVideoId(videoUrl)
  if (!videoId) {
    console.error('URL no válida.')
    return null
  }
  const apiKey = process.env.YOUTUBE_API_KEY
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,topicDetails`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (data.items && data.items.length > 0) {
      const videoData = data.items[0]
      const thumbnails = videoData.snippet.thumbnails
      const thumbnailUrl = thumbnails.maxres?.url ??
        thumbnails.standard?.url ??
        thumbnails.high?.url ??
        thumbnails.medium?.url ??
        thumbnails.default?.url
      
      return {
        title: videoData.snippet.title,
        description: videoData.snippet.description,
        publishedAt: videoData.snippet.publishedAt,
        thumbnailUrl: thumbnailUrl,
        tags: videoData.snippet.tags,
      }
    } else {
      console.error('No se encontraron datos para este video.')
      return null
    }
  } catch (error) {
    console.error('Error al obtener los metadatos:', error)
    return null
  }
}
