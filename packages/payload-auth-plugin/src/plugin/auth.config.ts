import type { NextAuthOptions } from "next-auth";
import { AuthPluginConfig } from "../types";

export const SESSION_STRATEGY = "database" as const;
export const FIELDS_USER_IS_ALLOWED_TO_CHANGE = ["name"];

/**
 * Crea una configuración de NextAuth basada en la configuración del plugin
 */
export const createAuthConfig = (config: AuthPluginConfig): NextAuthOptions => {
  // Configuración de Keycloak
  const keycloakIssuer = config.keycloakConfig?.serverUrl
    ? `${config.keycloakConfig.serverUrl}/realms/${config.keycloakConfig.realm}`
    : undefined;

  // Valores por defecto
  const secret =
    process.env.AUTH_SECRET || config.nextAuthConfig?.secret || "your-secret";
  const keycloakClientId =
    process.env.AUTH_KEYCLOAK_ID || config.keycloakConfig?.clientId || "";
  const keycloakClientSecret =
    process.env.AUTH_KEYCLOAK_SECRET ||
    config.keycloakConfig?.clientSecret ||
    "";

  // Crear la configuración base
  const authOptions: NextAuthOptions = {
    secret,
    session: {
      strategy: config.nextAuthConfig?.session?.strategy || SESSION_STRATEGY,
      maxAge: config.nextAuthConfig?.session?.maxAge || 30 * 24 * 60 * 60, // 30 días
    },
    pages: config.nextAuthConfig?.pages,
    providers: [],
  };

  return authOptions;
};
