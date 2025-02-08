export async function getUserInfoQuery(accessToken: string): Promise<string[]> {
  const userInfoUrl = `https://${process.env.KC_HOSTNAME}/realms/${process.env.KC_REALM}/protocol/openid-connect/userinfo`

  const response = await fetch(userInfoUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error al obtener los grupos: ${response.statusText}`)
  }

  const userInfo = await response.json()
  return [...userInfo.roles, ...userInfo.realm_access.roles]
}
