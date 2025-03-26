import { getCurrentUserQuery } from '@/core/auth/payloadUser/getCurrentUserQuery'
import { routes } from '@/core/routesGenerator'
import { createRouteHandlers } from 'payload-stripe-inventory'

const { GET } = createRouteHandlers(getCurrentUserQuery, () => routes)

export { GET }
