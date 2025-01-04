import { BasePayload } from 'payload'
import { TopicsResult } from './forum_sync_models'

export const getTopicsFromForum = async (
  payload: BasePayload,
  categoryId: string = '6',
): Promise<TopicsResult[]> => {
  const apiUrl = `https://foro.laemboscadura.com/api/category/${categoryId}`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Error fetching YouTube videos: ${response.statusText}`)
  }

  const data = await response.json()
  return (
    data?.topics?.map((topic: any) => {
      return {
        slug: topic.slug,
        title: topic.title,
        timestamp: topic.timestamp,
        lastposttime: topic.lastposttime,
      }
    }) ?? []
  )
}
