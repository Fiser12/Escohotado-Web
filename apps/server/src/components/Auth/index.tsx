import { Button } from '@payloadcms/ui'
import { signin } from '../../plugins/oauth/signin'

export const AuthComponent = () => {
  return (
    <form
      action={async () => {
        'use server'
        signin('keycloak')
      }}
    >
      <Button type="submit">Sign in with Keycloak</Button>
    </form>
  )
}
export default AuthComponent