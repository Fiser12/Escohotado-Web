export const loginKeycloak = async (): Promise<{ token: string }> => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('client_id', 'admin-cli')
  urlencoded.append('grant_type', 'password')
  urlencoded.append('username', 'ruben')
  urlencoded.append('password', process.env.KEYCLOAK_ADMIN_PASSWORD ?? '')
  const response = await fetch(
    'https://auth.nexolabs.xyz/realms/Escohotado/protocol/openid-connect/token',
    {
      method: 'POST',
      headers: headers,
      body: urlencoded,
      redirect: 'follow',
    },
  )

  const json = await response.json()
  return { token: json.access_token ?? 'error' }
}
