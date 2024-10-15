import { redirect } from 'next/dist/api/navigation'

export function signin(provider: string) {
  redirect('/api/oauth/authorization/' + provider)
}