import { BasePayload } from 'payload'
import { PostsResult } from './forum_sync_models'

const getPostsFromTopicPagination = async (
  topicId: string = '17',
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
  topicId: string,
): Promise<PostsResult[]> => {
  const page = await getPostsFromTopicPagination(topicId)
  const apiUrl = `${process.env.FORUM_URL}/api/topic/${topicId}?${page}`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Error fetching pagination from topic from forum: ${response.statusText} topicId: ${topicId}`)
  }

  const data = await response.json()
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
