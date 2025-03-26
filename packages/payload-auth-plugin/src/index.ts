// Exportamos los tipos
export * from "./types";

// Exportamos el plugin principal
export { createAuthPlugin } from "./plugin";

// Exportamos las utilidades
export { getCurrentUserQuery } from "./utils/getCurrentUserQuery";

// Exportamos las funciones de Keycloak
export { createKeycloakClient, FORUM_CLIENT_ID } from "./keycloak";

// Exportamos la configuración de autenticación
export {
  createAuthConfig,
  SESSION_STRATEGY,
  FIELDS_USER_IS_ALLOWED_TO_CHANGE,
} from "./plugin/auth.config";
