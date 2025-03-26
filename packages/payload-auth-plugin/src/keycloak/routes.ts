import { KeycloakConfig } from "../types";

/**
 * Crea las rutas de la API de Keycloak
 *
 * @param config Configuración de Keycloak
 * @returns Objeto con las rutas de la API
 */
export const createKeycloakRoutes = (config: KeycloakConfig) => {
  const baseUrl = config.serverUrl;
  const realm = config.realm;

  return {
    issuer: `${baseUrl}/realms/${realm}`,
    loginApi: `${baseUrl}/realms/${realm}/protocol/openid-connect/token`,
    userApi: (userId: string) =>
      `${baseUrl}/admin/realms/${realm}/users/${userId}`,
    roleMappingApi: (userId: string, clientId: string) =>
      `${baseUrl}/admin/realms/${realm}/users/${userId}/role-mappings/clients/${clientId}`,
  };
};
