'use server'

import { revalidateTag } from 'next/cache'
import type { Payload } from 'payload'
import type { User } from '@/../payload-types'
import { SESSION_STRATEGY } from '@/payload/plugins/authjs/auth.config'

export const revalidateUser = async (user: User, payload: Payload) => {
  revalidateTag(`payload-user-${user.id}`)
  revalidateTag(`payload-user-email-${user.email}`)
  if (SESSION_STRATEGY === 'database') {
    user.sessions?.forEach((session) => {
      revalidateTag(`payload-user-session-${session.sessionToken}`)
    })
  }
}
