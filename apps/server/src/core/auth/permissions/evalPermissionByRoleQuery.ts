import { User } from 'payload-types'
import 'hegel'
import { getUserPermissions } from './getUserPermissions'

export const evalPermissionByRoleQuery = (
  user: User | null,
  permissions_seeds?: string | null,
): boolean => {
  const userPermissions = getUserPermissions(user)
  if (!permissions_seeds) return true
  const requiredPermissions = permissions_seeds.split(',').map((p) => p.trim())
  return requiredPermissions.some(
    (permission) => permission && userPermissions.includes(permission),
  )
}
