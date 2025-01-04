import { BasePayload } from "payload";

export const createTopicAtForumCommand = async (
  payload: BasePayload,
  title: string,
  categoryId: string
): Promise<string> => {
  payload.logger.info(`Creando nuevo tema en el foro para ${title}`);

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
    payload.logger.info(`Creado nuevo tema en el foro con ID: ${data.response.tid}`);
    return data.response.tid
  } else {
    payload.logger.error(`tid not found in the response`);
    throw new Error('tid not found in the response.')
  }
}
