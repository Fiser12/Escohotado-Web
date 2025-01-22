import { getYouTubeVideoMetadata } from '@/core/admin/youtube_importer/getYouTubeVideoMetadata'
import { CollectionBeforeChangeHook } from 'payload'

export interface YouTubeVideoMetadata {
  title: string
  description: string
  publishedAt: string
  tags: string[]
  thumbnailUrl: string
}

export const getYoutubeVideoMetadataHook: CollectionBeforeChangeHook = async ({ context, data }) => {
  if (context.triggerAfterChange === false) {
    return
  }

  return {
    ...data,
    ...(await getYouTubeVideoMetadata(data.url_free ?? data.url)),
  }
}
