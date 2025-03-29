import { getCurrentUserQuery } from '@/core/queries/getCurrentUserQuery'
import { routes } from '@/core/routesGenerator'
import { createRouteHandlers } from 'payload-stripe-inventory/server'

export const {
  GET,
}: {
  GET: (request: Request, { params }: { params: { stripe: string[] } }) => Promise<Response>
} = createRouteHandlers(getCurrentUserQuery, () => routes)
