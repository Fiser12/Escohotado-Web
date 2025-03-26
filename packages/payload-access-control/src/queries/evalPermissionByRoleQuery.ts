import { BaseUser } from "../types";
import { getUserPermissions } from "../utils/getUserPermissions";

/**
 * Evalúa si un usuario tiene los permisos necesarios basados en las semillas de permisos
 */
export const evalPermissionByRoleQuery = <T extends BaseUser>(
  user: T | null,
  permissions_seeds?: string | null
): boolean => {
  const userPermissions = getUserPermissions(user);

  if (!permissions_seeds) return true;

  const requiredPermissions = permissions_seeds.split(",").map(p => p.trim());

  return requiredPermissions.some(
    permission => permission && userPermissions.includes(permission)
  );
};
