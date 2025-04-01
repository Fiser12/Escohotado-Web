export interface YoutubeVideo {
    id: string
    title: string
    publishedAt: string
    tags: string[]
    thumbnailUrl: string
    viewCount: string
    duration: string
  }
  
  export interface YoutubeVideosResult {
    nextPageToken: string | null
    videos: YoutubeVideo[]
  }
  