import { getPayload } from '@/payload/utils/getPayload'
import { getCurrentUserQuery } from '../payloadUser/getCurrentUserQuery'
import { evalPermissionByRoleQuery } from './evalPermissionByRoleQuery'
import { getUserPermissions } from './getUserPermissions'

export const evalAdvancePermissionQuery = async (
  typeOfPermission: 'all' | 'roles' | 'only_no_roles' | 'only_guess',
  permissions: string | undefined,
): Promise<boolean> => {
  const payload = await getPayload()
  const user = await getCurrentUserQuery(payload)

  if (typeOfPermission === 'all') {
    return true
  } else if (typeOfPermission === 'roles') {
    return evalPermissionByRoleQuery(user, permissions)
  } else if (typeOfPermission === 'only_no_roles') {
    const userPermissions = getUserPermissions(user)
    return userPermissions.length === 0
  } else if (typeOfPermission === 'only_guess') {
    return user === null
  }

  return true
}
