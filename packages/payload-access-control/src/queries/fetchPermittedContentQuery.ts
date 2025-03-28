import { BaseUser } from "../types";
import { evalPermissionByRoleQuery } from "./evalPermissionByRoleQuery";

/**
 * Filtra contenido basado en los permisos del usuario
 */
export const fetchPermittedContentQuery = <T extends BaseUser, C>(
  user: T | null | undefined,
  permissions_seeds: string,
  content: C,
  freeContent: C | null = null
): C | null => {
  const isFreeContent = permissions_seeds === "";
  const hasPermission = evalPermissionByRoleQuery(user, permissions_seeds);

  if (isFreeContent) {
    return content;
  }

  if (hasPermission) {
    return content;
  }

  return freeContent;
};
