import { YoutubeVideo } from './youtube_video_model'
let temp = true
export const mapApiYoutubeVideoToModel: (video: any) => YoutubeVideo = (video) => {
  const snippet = video.snippet
  const thumbnailUrl =
    snippet.thumbnails.maxres?.url ??
    snippet.thumbnails.standard?.url ??
    snippet.thumbnails.high?.url ??
    snippet.thumbnails.medium?.url ??
    snippet.thumbnails.default?.url
  const id = snippet.resourceId?.videoId ?? video.id

  return {
    id,
    url: `https://www.youtube.com/watch?v=${id}`,
    title: snippet.title,
    description: snippet.description,
    publishedAt: snippet.publishedAt,
    tags: snippet.tags || [],
    thumbnailUrl: thumbnailUrl,
  }
}
