import { routes } from '@/core/routes-generator'
import { NextAuthConfig } from 'next-auth'
import keycloak from 'next-auth/providers/keycloak'

export const SESSION_STRATEGY = 'database' as 'jwt' | 'database'
export const FIELDS_USER_IS_ALLOWED_TO_CHANGE = ['name']

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
      issuer: routes.keycloak.issuer,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          roles: [...(profile.roles ?? []), profile.realm_access.roles ?? []],
        }
      },
    }),
  ],
  session: {
    strategy: SESSION_STRATEGY,
  },
}
