import { BasePayload, CollectionSlug } from 'payload'
import { TopicsResult, PostsResult } from './forum_sync_models'
import { getPostsAtTopicFromForum } from './get_posts_at_topic_from_forum_api'
import { getTopicsFromForum } from './get_topics_from_forum'

export const updateForumDataAtCollection = async (
  payload: BasePayload,
  collection: CollectionSlug,
  id: string,
  forumPostId: string | null,
) => {
  let databaseContent: TopicsResult[] | PostsResult[] = []
  if (forumPostId?.startsWith('topic_')) {
    databaseContent = await getPostsAtTopicFromForum(payload, forumPostId.replace('topic_', ''))
  } else if (forumPostId?.startsWith('category_')) {
    databaseContent = await getTopicsFromForum(payload, id.replace('category_', ''))
  } else if (!forumPostId) {
    return
  }

  await payload.update({
    collection,
    id,
    data: {
      forum_post_id: forumPostId,
      last_forum_posts: databaseContent,
      last_forum_sync: new Date().toISOString(),
    },
  })
}
