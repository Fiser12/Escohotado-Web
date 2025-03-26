import { getCurrentUserQuery } from '@/core/auth/payloadUser/getCurrentUserQuery'
import { routes } from '@/core/routesGenerator'
import { createRouteHandlers } from 'payload-stripe-inventory'

export const { GET }: { 
  GET: (
    request: Request, 
    { params }: { params: { stripe: string[] } }
  ) => Promise<Response> 
} = createRouteHandlers(getCurrentUserQuery, () => routes)