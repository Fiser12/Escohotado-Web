import { NextAuthConfig } from 'next-auth'
import keycloak from 'next-auth/providers/keycloak'
import jwt from 'jsonwebtoken'
import { getUserInfo } from './keycloak.service'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { COLLECTION_SLUG_USER } from '@/collections/config'

export const SESSION_STRATEGY = 'database' as 'jwt' | 'database'
export const FIELDS_USER_IS_ALLOWED_TO_CHANGE = ['name']
export const ADMIN_ACCESS_ROLES = 'admin'


export const authConfig: NextAuthConfig = {
  theme: { logo: 'https://authjs.dev/img/logo-sm.png' },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    keycloak({
      allowDangerousEmailAccountLinking: true,
      id: 'keycloak',
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: process.env.PUBLIC_AUTH_KEYCLOAK_ISSUER,
      profile(profile, tokens) {
        if (tokens.access_token) {
          const decodedToken = jwt.decode(tokens.access_token)
          if (decodedToken && typeof decodedToken !== 'string') {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            profile.roles = decodedToken.resource_access?.[process.env.AUTH_KEYCLOAK_ID!]?.roles 
          }
        }
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          roles: profile.roles ?? [], // Extend the user
        }
      },
    }),
  ],
  session: {
    strategy: SESSION_STRATEGY,
  },
  callbacks: {
    session: async (temp) => {
      const { session, user } = temp
      if (user) {
        session.user.id = user.id
      }
      return session
    },
    
    async signIn(data) {
      const payload = await getPayloadHMR({config})
      const userId = data.user.id;

      if (!userId || !data.account?.access_token) {
        return true
      }
      const keycloakRoles = await getUserInfo(data.account.access_token)
      try {

        await payload.update({
          collection: COLLECTION_SLUG_USER,
          id: userId,
          data: {
            roles: keycloakRoles,
          }
        }); 
      } catch {}  
      return true
    },
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
}
