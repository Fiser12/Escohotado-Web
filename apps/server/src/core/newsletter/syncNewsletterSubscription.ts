type Props = {
  email: string
  name?: string | null;
  isSubscribedToNewsletter: boolean
}

const API_BASE_URL = `${process.env.NEWSLETTER_URL}/api/subscribers`;
const USERNAME = 'api_admin'
const TOKEN = process.env.NEWSLETTER_API_TOKEN
const SUBSCRIBERS_LIST_ID = Number(process.env.NEWSLETTER_SUBSCRIBERS_LIST_ID)

const getAuthHeader = (): HeadersInit => {
  const auth = Buffer.from(`${USERNAME}:${TOKEN}`).toString('base64')
  return {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/json',
  }
}

export const getNewsletterSubscriberId = async (email: string): Promise<number | null> => {
  const query = `subscribers.email = '${email}'`
  const url = `${API_BASE_URL}?query=${encodeURIComponent(query)}`

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeader(),
  })

  if (!response.ok) {
    throw new Error(`Error obteniendo el suscriptor: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  return data.data.results?.[0]?.id || null
}

export const createNewsletterSubscriber = async (email: string, name?: string | null): Promise<any> => {
  const url = API_BASE_URL
  const body = JSON.stringify({ 
    name,
    email, 
    lists: [SUBSCRIBERS_LIST_ID] 
})

  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeader(),
    body,
  })

  if (!response.ok) {
    throw new Error(`Error creando el suscriptor: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

export const deleteNewsletterSubscriber = async (subscriberId: number): Promise<any> => {
  const url = `${API_BASE_URL}/${subscriberId}`

  const response = await fetch(url, {
    method: 'DELETE',
    headers: getAuthHeader(),
  })

  if (!response.ok) {
    throw new Error(`Error eliminando el suscriptor: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

const syncNewsletterSubscription = async (props: Props): Promise<void> => {
  try {
    const subscriberId = await getNewsletterSubscriberId(props.email)

    if (subscriberId && !props.isSubscribedToNewsletter) {
      await deleteNewsletterSubscriber(subscriberId)
      console.log(`Se ha eliminado el suscriptor con email ${props.email}`)
    } else if (!subscriberId && props.isSubscribedToNewsletter) {
      await createNewsletterSubscriber(props.email, props.name)
      console.log(`Se ha creado el suscriptor con email ${props.email}`)
    } else {
      console.warn('El usuario ya tiene el mismo estado de suscripción')
    }
  } catch (error) {
    console.error('Error sincronizando la suscripción al newsletter:', error)
  }
}

export default syncNewsletterSubscription
