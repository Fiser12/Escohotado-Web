/**
 * Tipo base para usuarios con sistema de autenticación
 */
export interface BaseUser {
  id: string | number;
  roles?: string[];
  inventory?: any;
  [key: string]: any;
}

/**
 * Configuración para un proveedor de autenticación
 */
export interface AuthProviderConfig {
  provider: string;
  name?: string;
  clientId: string;
  clientSecret: string;
  issuer?: string;
  authorizationUrl?: string;
  tokenUrl?: string;
  userInfoUrl?: string;
  profileUrl?: string;
  scope?: string;
}

/**
 * Configuración general de autenticación
 */
export interface AuthConfig {
  secret: string;
  providers: AuthProviderConfig[];
  adapter?: any;
  session?: {
    strategy: "jwt" | "database";
    maxAge: number;
  };
  pages?: {
    signIn?: string;
    signOut?: string;
    error?: string;
    verifyRequest?: string;
    newUser?: string;
  };
  callbacks?: {
    signIn?: (user: any, account: any, profile: any) => Promise<boolean>;
    redirect?: (url: string, baseUrl: string) => Promise<string>;
    session?: (session: any, user: any) => Promise<any>;
    jwt?: (
      token: any,
      user: any,
      account: any,
      profile: any,
      isNewUser: boolean
    ) => Promise<any>;
  };
}

/**
 * Configuración para Keycloak
 */
export interface KeycloakConfig {
  serverUrl: string;
  realm: string;
  clientId: string;
  clientSecret: string;
  publicClient?: boolean;
  bearerOnly?: boolean;
  confidentialPort?: number;
}

/**
 * Configuración completa del plugin de autenticación
 */
export interface AuthPluginConfig {
  nextAuthConfig?: AuthConfig;
  keycloakConfig?: KeycloakConfig;
}
