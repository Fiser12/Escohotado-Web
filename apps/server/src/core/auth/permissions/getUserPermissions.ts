import { User, Subscription } from 'payload-types'

export const getUserPermissions = (user: User | null): string[] => {
  return (
    user?.subscription?.docs
      ?.cast<Subscription>()
      ?.filter((subscription) => subscription.status === 'active')
      ?.flatMap((subscription) => subscription.permissions_seeds?.split(' '))
      ?.mapNotNull((permission) => permission) ?? []
  )
}
