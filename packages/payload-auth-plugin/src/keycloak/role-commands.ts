import { KeycloakConfig } from "../types";
import { createKeycloakLogin } from "./login";
import { createKeycloakRoutes } from "./routes";

export const FORUM_CLIENT_ID = "escohotado-forum";

/**
 * Crea funciones para administrar roles en Keycloak
 *
 * @param config Configuración de Keycloak
 * @returns Objeto con funciones para administrar roles
 */
export const createRoleCommands = (config: KeycloakConfig) => {
  const routes = createKeycloakRoutes(config);
  const login = createKeycloakLogin(config);

  /**
   * Añade el rol de premium al usuario en el foro
   *
   * @param userId ID del usuario
   * @param roleId ID del rol (opcional)
   * @param roleName Nombre del rol (opcional)
   */
  const addForumPremiumRoleCommand = async (
    userId: string,
    roleId: string = "b845e658-d9b4-4905-8203-aee0aea110d4",
    roleName: string = "foro_premium"
  ): Promise<void> => {
    const { token } = await login();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const clientId = process.env.KEYCLOAK_FORUM_CLIENT_ID || FORUM_CLIENT_ID;

    try {
      const response = await fetch(routes.roleMappingApi(userId, clientId), {
        method: "POST",
        headers: headers,
        body: JSON.stringify([
          {
            id: roleId,
            name: roleName,
          },
        ]),
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`Failed to add role: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`ERROR ADDING FORUM PREMIUM ROLE: ${error}`);
      throw error;
    }
  };

  /**
   * Elimina el rol de premium al usuario en el foro
   *
   * @param userId ID del usuario
   * @param roleId ID del rol (opcional)
   * @param roleName Nombre del rol (opcional)
   */
  const deleteForumPremiumRoleCommand = async (
    userId: string,
    roleId: string = "b845e658-d9b4-4905-8203-aee0aea110d4",
    roleName: string = "foro_premium"
  ): Promise<void> => {
    const { token } = await login();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const clientId = process.env.KEYCLOAK_FORUM_CLIENT_ID || FORUM_CLIENT_ID;

    try {
      const response = await fetch(routes.roleMappingApi(userId, clientId), {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify([
          {
            id: roleId,
            name: roleName,
          },
        ]),
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete role: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`ERROR DELETING FORUM PREMIUM ROLE: ${error}`);
      throw error;
    }
  };

  return {
    addForumPremiumRoleCommand,
    deleteForumPremiumRoleCommand,
  };
};
