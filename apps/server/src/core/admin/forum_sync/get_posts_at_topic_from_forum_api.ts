import { BasePayload } from 'payload'
import { PostsResult } from './forum_sync_models'

const getPostsFromTopicPagination = async (
  payload: BasePayload,
  topicId: string = '17',
): Promise<string | null> => {
  const apiUrl = `https://foro.laemboscadura.com/api/topic/pagination/${topicId}`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Error fetching post from topic at forum: ${response.statusText}`)
  }

  const data = await response.json()
  return data?.pagination?.last?.qs ?? null
}

export const getPostsAtTopicFromForum = async (
  payload: BasePayload,
  topicId: string = '17',
): Promise<PostsResult[]> => {
  const page = await getPostsFromTopicPagination(payload, topicId)
  const apiUrl = `https://foro.laemboscadura.com/api/topic/${topicId}?${page}`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Error fetching pagination from topic from forum: ${response.statusText}`)
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
