'use server'

import syncYoutubeChannelToVideoCollection from '@/core/admin/youtube-importer/sync-youtube-channel-to-video-collection-command'
import syncForumWithDatabase from '@/core/admin/forum-sync'
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
