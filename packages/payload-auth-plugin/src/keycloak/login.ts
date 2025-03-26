import { KeycloakConfig } from "../types";
import { createKeycloakRoutes } from "./routes";

/**
 * Crea una función para realizar login en Keycloak
 *
 * @param config Configuración de Keycloak
 * @returns Función de login
 */
export const createKeycloakLogin = (config: KeycloakConfig) => {
  const routes = createKeycloakRoutes(config);

  return async (
    username?: string,
    password?: string
  ): Promise<{ token: string }> => {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "admin-cli");
    urlencoded.append("grant_type", "password");
    urlencoded.append(
      "username",
      username || process.env.KEYCLOAK_ADMIN_USERNAME || "admin"
    );
    urlencoded.append(
      "password",
      password || process.env.KEYCLOAK_ADMIN_PASSWORD || ""
    );

    const response = await fetch(routes.loginApi, {
      method: "POST",
      headers: headers,
      body: urlencoded,
      redirect: "follow",
    });

    const json = await response.json();
    if (!json.access_token) {
      throw new Error("Failed to login to Keycloak");
    }

    return { token: json.access_token };
  };
};
