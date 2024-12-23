export interface YoutubeVideo {
    id: string
    url: string
    title: string
    description: string
    publishedAt: string
    tags: string[]
    thumbnailUrl: string
  }
  
  export interface YoutubeVideosResult {
    nextPageToken: string | null
    videos: YoutubeVideo[]
  }
  