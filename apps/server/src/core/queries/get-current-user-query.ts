'use server'

import { getPayload } from '@/payload/utils/get-payload'
import { headers as getHeaders } from 'next/headers'
import { BasePayload } from 'payload'
import { BaseUser } from 'payload-access-control'

/**
 * Get the current user with out needing to import the payload instance & headers.
 *
 * @description The difference between this function and the one in the auth/edge.ts file is that here we get
 * payload instance, just to make other parts of you code cleaner. We can't get the payload instance in the
 * auth/edge.ts file because that could cause a import loop.
 */

export async function getCurrentUserQuery(
  payload: BasePayload | null = null,
): Promise<BaseUser | null> {
  const headers = getHeaders()
  payload = payload ?? (await getPayload())
  return (await payload.auth({ headers } as any)).user
}
