import { KeycloakConfig } from "../types";
import { createKeycloakLogin } from "./login";
import { createKeycloakRoutes } from "./routes";
import { FORUM_CLIENT_ID, createRoleCommands } from "./role-commands";

/**
 * Crea un cliente de Keycloak
 *
 * @param config Configuración de Keycloak
 * @returns Cliente de Keycloak
 */
export const createKeycloakClient = (config: KeycloakConfig) => {
  const roleCommands = createRoleCommands(config);
  const login = createKeycloakLogin(config);
  const routes = createKeycloakRoutes(config);

  return {
    ...roleCommands,
    login,
    routes,
  };
};

export { FORUM_CLIENT_ID };
