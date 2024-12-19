import { User, Subscription } from 'payload-types'
import 'hegel'

export const evalPermissionQuery = (user: User | null, permissions_seeds: string): boolean => {
  const userPermissions =
    user?.subscription?.docs
      ?.cast<Subscription>()
      ?.filter((subscription) => subscription.status === 'active')
      ?.map((subscription) => subscription.permissions_seeds) ?? []
  if (permissions_seeds == '') return true

  return userPermissions.some((permission) => permission && permissions_seeds.includes(permission))
}
