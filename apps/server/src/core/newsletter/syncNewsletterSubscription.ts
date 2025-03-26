import { routes } from "../routesGenerator";

type Props = {
  email: string
  name?: string | null;
  isSubscribedToNewsletter: boolean
}

const USERNAME = 'admin_api'
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
  const url = `${routes.newsletter.newsletterSubscribersApi}?query=${encodeURIComponent(query)}`
  console.log('url to request fetch get', url)

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
  const url = routes.newsletter.newsletterSubscribersApi
  const body = JSON.stringify({ 
    name,
    email, 
    lists: [SUBSCRIBERS_LIST_ID] 
  })
  console.log('url to request fetch, create', url)

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
  const url = `${routes.newsletter.newsletterSubscribersApi}/${subscriberId}`
  console.log('url to request fetch, delete', url)

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
    console.error(
      'Error sincronizando la suscripción al newsletter:', 
      error, 
      props,
    )
  }
}

export default syncNewsletterSubscription
