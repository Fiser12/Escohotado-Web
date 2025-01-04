import { BasePayload } from 'payload'
import { PostsResult } from './forum_sync_models'

const getPostsFromTopicPagination = async (
  topicId: string,
): Promise<string | null> => {
  const apiUrl = `${process.env.FORUM_URL}/api/topic/pagination/${topicId}`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Error fetching post from topic at forum: ${response.statusText} topicId: ${topicId}`)
  }

  const data = await response.json()
  return data?.pagination?.last?.qs ?? null
}

export const getPostsAtTopicFromForum = async (
  payload: BasePayload,
  topicId: string,
): Promise<PostsResult[]> => {
  payload.logger.info(`Getting pages from topic ${topicId}`);

  const page = await getPostsFromTopicPagination(topicId)
  payload.logger.info(`Page ${page} Getting posts from topic ${topicId}`);

  const apiUrl = `${process.env.FORUM_URL}/api/topic/${topicId}?${page}`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Error fetching pagination from topic at forum: ${response.statusText} topicId: ${topicId}`)
  }

  const data = await response.json()
  payload.logger.info(`Posts fetched from topic ${topicId}: ${data?.posts?.length}`);
  return (
    data?.posts?.map((post: any) => {
      return {
        pid: post.pid,
        content: post.content,
        timestamp: post.timestamp,
        userName: post.user.username,
      }
    }) ?? []
  )
}
