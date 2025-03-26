import { loginKeycloak } from './loginKeycloak'
import { forumClientId } from './constants'
import { routes } from '@/core/routesGenerator'

export const deleteForumPremiumRoleCommand = async (userId: string): Promise<void> => {
  const { token } = await loginKeycloak()

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)

  fetch(
    routes.keycloak.roleMappingApi(userId, forumClientId),
    {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify([
        {
          id: 'b845e658-d9b4-4905-8203-aee0aea110d4',
          name: "foro_premium",
        },
      ]),
      redirect: 'follow',
    },
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(`ERROR DELETE FORUM PREMIUM ROLE: ${error}`))
}
