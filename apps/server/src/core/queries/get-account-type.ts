import {
  BaseUser,
  UserInventory,
  getUserPermissions,
  permissionSlugs,
} from 'payload-access-control'

export const getAccountType = (user: BaseUser<UserInventory>) => {
  const permissions = getUserPermissions(user)
  if (permissions.length === 0) return 'Freemium'
  if (permissions.includes(permissionSlugs.basic)) return 'Básico'
  if (permissions.includes(permissionSlugs.tester)) return 'Tester'
  if (permissions.includes(permissionSlugs.dev)) return 'Developer'
  return 'unknown'
}
