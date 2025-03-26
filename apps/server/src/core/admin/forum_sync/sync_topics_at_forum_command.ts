import { routes } from "@/core/routesGenerator"

interface Topic {
  id: string
  title?: string
  content?: string
  cid: string
  tid?: string
}

interface TopicResonse {
  itemId: string
  tid: string
  lastPosts: PostResponse[]
}

interface PostResponse {
  pid: number,
  content: string,
  timestamp: number,
  userName: string
}
export const syncTopicsAtForumCommand = async (
  items: Topic[],
  uid: string = "19"
): Promise<TopicResonse[]> => {
  const apiUrl = new URL(routes.nodeBB.syncTopicsApi)
  const token = process.env.NODEBB_TOKEN
  const requestBody = JSON.stringify({
    items,
    _uid: uid
  })
  console.log(`Request for ${items.length} topics`)
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: requestBody,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Error creating topic: ${response.status} ${response.statusText} - ${errorText}`,
    )
  }
  console.log(`Request success`)

  return await response.json() as TopicResonse[]
}
