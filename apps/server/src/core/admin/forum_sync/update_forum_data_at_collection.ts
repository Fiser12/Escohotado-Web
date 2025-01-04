import { BasePayload, CollectionSlug } from 'payload'
import { getPostsAtTopicFromForum } from './get_posts_at_topic_from_forum_api'
import { getDrizzleSchemaFromCollection } from '../drizzle/get_drizzle_schema_from_collection'
import { eq } from '@payloadcms/db-postgres/drizzle'
import { video, article_pdf, article_web, book } from '@/payload-generated-schema'

export const updateForumDataAtCollection = async (
  payload: BasePayload,
  collection: CollectionSlug,
  id: string,
  forumPostId: string,
) => { 
  const schema = getDrizzleSchemaFromCollection(collection) as any
  await payload.db.drizzle
    .update(book)
    .set({
      forum_post_id: forumPostId,
      last_forum_posts: await getPostsAtTopicFromForum(payload, forumPostId),
      last_forum_sync: new Date().toISOString(),
    })
    .where(eq(book.id, id))
    .execute()
}
