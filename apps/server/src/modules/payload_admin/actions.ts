'use server'

import syncYoutubeChannelToVideoCollection from '@/core/admin/youtube_importer/sync_youtube_channel_to_video_collection_command'
import syncForumWithDatabase from '@/core/admin/forum_sync'
import { CollectionSlug } from 'payload'

export async function syncForumPosts(collectionSlug: CollectionSlug) {
  const validCollections: CollectionSlug[] = ['book', 'video', 'article_web']
  const slug = validCollections.includes(collectionSlug as CollectionSlug) ? collectionSlug : 'book'
  await syncForumWithDatabase(slug)
}

export async function syncNewVideos() {
  await syncYoutubeChannelToVideoCollection(false)
}

export async function syncAllVideos() {
  await syncYoutubeChannelToVideoCollection(true)
}
