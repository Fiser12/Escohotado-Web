import { getPayload } from '@/utils/payload'

const loginKeycloak = async (): Promise<{token: string}> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  
  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", "admin-cli");
  urlencoded.append("grant_type", "password");
  urlencoded.append("username", "ruben");
  urlencoded.append("password", process.env.KEYCLOAK_ADMIN_PASSWORD ?? "");
  const response = await fetch(
      "https://auth.nexolabs.xyz/realms/Escohotado/protocol/openid-connect/token", 
      {
          method: "POST",
          headers: headers,
          body: urlencoded,
          redirect: "follow"
      }
  )

  const json = await response.json()
  return { token: json.access_token ?? "error" }
}

export const addForumPremiumRole = async (userId: string): Promise<void> => {
  const { token } = await loginKeycloak()
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  
  fetch(
    `https://auth.nexolabs.xyz/admin/realms/Escohotado/users/${userId}/role-mappings/clients/154dd48a-eb9c-480b-a4e7-f47680a61b7e`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify([{
        id: 'b845e658-d9b4-4905-8203-aee0aea110d4',
        name: 'foro_premium',
      }]),
      redirect: 'follow',
    },
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(`ERROR ADDING FORUM PREMIUM ROLE: ${error}`))
}

export const deleteForumPremiumRole = async (userId: string): Promise<void> => {
  const { token } = await loginKeycloak()

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)

  fetch(
    `https://auth.nexolabs.xyz/admin/realms/Escohotado/users/${userId}/role-mappings/clients/154dd48a-eb9c-480b-a4e7-f47680a61b7e`,
    {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify([{
        id: 'b845e658-d9b4-4905-8203-aee0aea110d4',
        name: 'foro_premium',
      }]),
      redirect: 'follow',
    },
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(`ERROR DELETE FORUM PREMIUM ROLE: ${error}`))
}
