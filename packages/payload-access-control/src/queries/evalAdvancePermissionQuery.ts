import { BaseUser } from "../types";
import { getUserPermissions } from "../utils/getUserPermissions";
import { evalPermissionByRoleQuery } from "./evalPermissionByRoleQuery";
import { PERMISSION_TYPES } from "../constants";

/**
 * Evalúa permisos avanzados basados en el tipo de permiso y usuario
 */
export const evalAdvancePermissionQuery = <T extends BaseUser>(
  user: T | null,
  typeOfPermission: keyof typeof PERMISSION_TYPES | string,
  permissions?: string | undefined
): boolean => {
  if (typeOfPermission === PERMISSION_TYPES.ALL) {
    return true;
  } else if (typeOfPermission === PERMISSION_TYPES.ROLES) {
    return evalPermissionByRoleQuery(user, permissions);
  } else if (typeOfPermission === PERMISSION_TYPES.ONLY_NO_ROLES) {
    const userPermissions = getUserPermissions(user);
    return userPermissions.length === 0;
  } else if (typeOfPermission === PERMISSION_TYPES.ONLY_GUESS) {
    return user === null;
  }

  return true;
};
