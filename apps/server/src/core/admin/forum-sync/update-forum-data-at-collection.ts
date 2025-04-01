import { BasePayload, CollectionSlug } from 'payload'
import { getDrizzleSchemaFromCollection } from '@/core/admin/drizzle/get-drizzle-schema-from-collection'
import { eq } from '@payloadcms/db-postgres/drizzle'
import { PostsResult } from '@/core/admin/forum-sync/forum-sync-models'

export const updateForumDataAtCollection = async (
  payload: BasePayload,
  collection: CollectionSlug,
  id: string,
  forumPostId: string,
  posts: PostsResult[]
) => { 
  const schema = getDrizzleSchemaFromCollection(collection) as any
  await payload.db.drizzle
    .update(schema)
    .set({
      forum_post_id: forumPostId,
      last_forum_posts: posts,
      last_forum_sync: new Date().toISOString(),
    })
    .where(eq(schema.id, id))
    .execute()
}
