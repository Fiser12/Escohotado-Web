import { BasePayload, CollectionSlug } from 'payload'
import { TopicsResult, PostsResult } from './forum_sync_models'
import { getPostsAtTopicFromForum } from './get_posts_at_topic_from_forum_api'
import { createTopicAtForumCommand } from './create_topic_at_forum_command'

export const updateForumDataAtCollection = async (
  payload: BasePayload,
  collection: CollectionSlug,
  id: string,
  forumPostId: string | null,
  title: string,
  categoryId: string
) => {
  let databaseContent: TopicsResult[] | PostsResult[] = []
  if (!forumPostId) {
    forumPostId = await createTopicAtForumCommand(
      `Debate sobre: ${title}`,
      categoryId, 
      [collection]
    )
  }
  
  if (forumPostId && forumPostId != "") {
    databaseContent = await getPostsAtTopicFromForum(forumPostId)
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
