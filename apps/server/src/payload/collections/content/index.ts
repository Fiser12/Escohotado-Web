import { pdf } from '@/payload/collections/content/pdf'
import { articleWeb } from '@/payload/collections/content/articleWeb'
import { book } from '@/payload/collections/content/book'
import { video } from '@/payload/collections/content/video'
import { quote } from '@/payload/collections/content/quote'
import { addClearCacheHookBeforeChange } from '@/payload/collections/content/content_collection_builder'

export const contentCollections = [
  addClearCacheHookBeforeChange(pdf),
  addClearCacheHookBeforeChange(articleWeb),
  addClearCacheHookBeforeChange(book),
  addClearCacheHookBeforeChange(video),
  addClearCacheHookBeforeChange(quote),
]
