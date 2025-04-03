import { BaseUser } from "../types";
import { getUserPermissions } from "../utils/getUserPermissions";
import { evalPermissionByRoleQuery } from "./evalPermissionByRoleQuery";
import { QUERY_PERMISSION_TYPES } from "../constants";

/**
 * Evalúa permisos avanzados basados en el tipo de permiso y usuario
 */
export const evalAdvancePermissionQuery = <T extends BaseUser>(
  user: T | null,
  typeOfPermission: keyof typeof QUERY_PERMISSION_TYPES | string,
  permissions?: string | undefined
): boolean => {
  if (typeOfPermission === QUERY_PERMISSION_TYPES.ALL) {
    return true;
  } else if (typeOfPermission === QUERY_PERMISSION_TYPES.ROLES) {
    return evalPermissionByRoleQuery(user, permissions);
  } else if (typeOfPermission === QUERY_PERMISSION_TYPES.ONLY_NO_ROLES) {
    const userPermissions = getUserPermissions(user);
    return userPermissions.length === 0;
  } else if (typeOfPermission === QUERY_PERMISSION_TYPES.ONLY_GUESS) {
    return user === null;
  }

  return true;
};
