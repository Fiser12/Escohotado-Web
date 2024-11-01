import { cookies } from 'next/headers'
import type { CollectionSlug } from 'payload'
import { User } from 'payload-types'

interface Options {
  /**
   * The URL of the server
   *
   * @default process.env.NEXT_PUBLIC_SERVER_URL
   */
  serverUrl?: string
  /**
   * The slug of the collection that contains the users
   *
   * @default "users"
   */
  userCollectionSlug?: CollectionSlug
}

/**
 * Get the user payload from the server (only works on the server side)
 */
export const getPayloadUser = async <T extends object = User>({
  serverUrl,
  userCollectionSlug = 'users',
}: Options = {}): Promise<T | null> => {
  serverUrl = serverUrl || process.env.NEXT_PUBLIC_SERVER_URL
  const cookieStore = await cookies()

  const meUserReq = await fetch(`${serverUrl}/api/${userCollectionSlug}/me`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  })

  const { user }: { user: T } = await meUserReq.json()

  if (!meUserReq.ok || !user) {
    return null
  }

  return user
}
