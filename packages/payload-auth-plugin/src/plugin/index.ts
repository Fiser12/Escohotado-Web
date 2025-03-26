import type { Config, Plugin } from "payload";
import { AuthPluginConfig } from "../types";
import { createAuthConfig } from "./auth.config";

/**
 * Crea un plugin de Payload para autenticación
 *
 * @param config Configuración del plugin
 * @returns Plugin de Payload
 */
export const createAuthPlugin = (config: AuthPluginConfig): Plugin => {
  return (incomingConfig: Config): Config => {
    // Aquí podríamos añadir lógica adicional para modificar la configuración de Payload
    // Por ejemplo, agregar colecciones, endpoints, hooks, etc.

    return {
      ...incomingConfig,
      // Añadir cualquier modificación necesaria a la configuración
    };
  };
};
