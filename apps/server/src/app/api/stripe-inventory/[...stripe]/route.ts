import { getCurrentUserQuery } from '@/core/queries/get-current-user-query'
import { routes } from '@/core/routes-generator'
import { createRouteHandlers } from 'payload-stripe-inventory/server'

export const {
  GET,
}: {
  GET: (request: Request, { params }: { params: { stripe: string[] } }) => Promise<Response>
} = createRouteHandlers(getCurrentUserQuery, () => routes)
