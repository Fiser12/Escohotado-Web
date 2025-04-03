import { permissionSlugs } from "node_modules/payload-access-control/src/constants";
import { BaseUser } from "payload-access-control";

/**
 * Verifica si un usuario puede desbloquear un elemento basado en sus permisos y límites semanales
 * @param user Usuario base
 * @param permissions Permisos requeridos para el elemento
 * @returns Booleano indicando si el usuario puede desbloquear el elemento
 */
export const checkIfUserCanUnlockQuery = (
  user: BaseUser,
  permissions: string[]
): boolean => {
  return permissions.includes(permissionSlugs.freemium);
};
