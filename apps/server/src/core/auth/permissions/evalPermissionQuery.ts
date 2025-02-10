import { User, Subscription } from 'payload-types'
import 'hegel'

export const evalPermissionQuery = (user: User | null, permissions_seeds: 'basic' | 'premium' | ''): boolean => {
  const userPermissions =
    user?.subscription?.docs
      ?.cast<Subscription>()
      ?.filter((subscription) => subscription.status === 'active')
      ?.flatMap((subscription) => subscription.permissions_seeds?.split(" ")) ?? []
  if (permissions_seeds == '') return true

  return userPermissions.some((permission) => permission && permissions_seeds.includes(permission))
}
