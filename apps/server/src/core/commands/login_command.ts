import { signIn } from '@/payload/plugins/authjs/plugin'

export const loginCommand = async () => {
  'use server'
  await signIn('keycloak')
}
