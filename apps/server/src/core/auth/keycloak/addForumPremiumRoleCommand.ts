import { loginKeycloak } from './loginKeycloak'

export const addForumPremiumRoleCommand = async (userId: string): Promise<void> => {
  const { token } = await loginKeycloak()
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)

  fetch(
    `https://auth.nexolabs.xyz/admin/realms/Escohotado/users/${userId}/role-mappings/clients/154dd48a-eb9c-480b-a4e7-f47680a61b7e`,
    {
      method: 'POST',
      headers: headers,
      body: JSON.stringify([
        {
          id: 'b845e658-d9b4-4905-8203-aee0aea110d4',
          name: 'foro_premium',
        },
      ]),
      redirect: 'follow',
    },
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(`ERROR ADDING FORUM PREMIUM ROLE: ${error}`))
}
