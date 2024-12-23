import { extractYouTubeVideoId } from '@/core/admin/youtube_importer/extractYouTubeVideoId'
import { mapApiYoutubeVideoToModel } from '@/core/admin/youtube_importer/mapApiYoutubeVideoToModel'
import { YoutubeVideo } from './youtube_video_model'

export async function getYouTubeVideoMetadata(
  videoUrl: string,
): Promise<YoutubeVideo | null> {
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
      return mapApiYoutubeVideoToModel(videoData)
    } else {
      console.error('No se encontraron datos para este video.')
      return null
    }
  } catch (error) {
    console.error('Error al obtener los metadatos:', error)
    return null
  }
}
