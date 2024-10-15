import { AccountInfo, OIDCProviderConfig } from "./types"

export const keycloakProvider: (
    clientId: string,
    client_secret: string,
    issuer: string
) => OIDCProviderConfig = (clientId, clientSecret, issuer) => {

    return {
        client_id: clientId,
        client_secret: clientSecret,
        issuer: issuer,
        scope: "openid profile email",
        algorithm: 'oidc',
        name: 'Keycloak',
        id: 'keycloak',
        profile: (profile): AccountInfo => {
            return {
                sub: profile.sub as string,
                name: profile.name as string,
                email: profile.email as string,
                picture: profile.picture as string,
            }
        }
    }
}
