import { TopicsResult } from './forum_sync_models'

export const getTopicsFromForum = async (
  categoryId: string,
): Promise<TopicsResult[]> => {
  const apiUrl = `${process.env.FORUM_URL}/api/category/${categoryId}`

  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error(`Error fetching YouTube videos: ${response.statusText}`)
  }

  const data = await response.json()
  return (
    data?.topics?.map((topic: any) => {
      return {
        tid: topic.tid,
        slug: topic.slug,
        title: topic.title,
        timestamp: topic.timestamp,
        lastposttime: topic.lastposttime,
      }
    }) ?? []
  )
}
