import { User } from 'payload-types'
import { evalPermissionByRoleQuery } from './evalPermissionByRoleQuery'

export const fetchPermittedContentQuery = <T>(
  user: User | null,
  permissions_seeds: string,
  content: T,
  freeContent: T | null = null,
): T | null => {
  const isFreeContent = permissions_seeds == ''
  const hasPermission = evalPermissionByRoleQuery(user, permissions_seeds)
  if (isFreeContent) {
    return content
  }
  if (hasPermission) {
    return content
  }
  return freeContent
}
