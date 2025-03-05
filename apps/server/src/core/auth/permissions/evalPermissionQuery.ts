import { User, Subscription } from 'payload-types'
import 'hegel'

export const evalPermissionQuery = (user: User | null, permissions_seeds?: string | null): boolean => {
  const userPermissions = user?.subscription?.docs
      ?.cast<Subscription>()
      ?.filter((subscription) => subscription.status === 'active')
      ?.flatMap((subscription) => subscription.permissions_seeds?.split(" ")) ?? []
    if (!permissions_seeds) return true;
  const requiredPermissions = permissions_seeds.split(',').map(p => p.trim());
  return requiredPermissions.some(permission => permission &&  userPermissions.includes(permission));
}
