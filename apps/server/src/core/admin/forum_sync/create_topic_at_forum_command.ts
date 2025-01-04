export const createTopicAtForumCommand = async (
  title: string,
  categoryId: string,
  tags: string[] = [],
): Promise<string> => {
  const apiUrl = new URL('/api/v3/topics', process.env.FORUM_URL)
  const token = process.env.NODEBB_TOKEN
  const requestBody = JSON.stringify({
    title: title,
    content: title,
    cid: categoryId,
    _uid: "19"
  })
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

  const data = await response.json()

  if (data && data.response && data.response.tid) {
    return data.response.tid
  } else {
    throw new Error('tid not found in the response.')
  }
}
