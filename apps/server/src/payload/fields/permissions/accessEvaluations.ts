import { Access } from "payload"
import { Subscription } from "payload-types"

export const checkReadPermissions: Access = (props) => {
  if(isAdmin(props)) return true
  const userPermissions = props.req.user?.subscription?.docs
    ?.map(sub => sub as Subscription)
    ?.flatMap(sub => sub.permissions_seeds) ?? []
  return {or: [
    {permissions_seeds: { equals: "" }},
    ...userPermissions.map(perm => ({ permissions_seeds: { contains: perm }}))
  ]}
}


export const isAdmin: Access = ({ req }) => {
  return req?.user?.roles?.includes('admin') || false
}

export const isAdminOrCurrentUser: Access = ({ req }) => {
  if (req?.user?.roles?.includes('admin') == true) return true
  return { id: { equals: req.user?.id } }
}

export const isAnyone: Access = () => true

export const isAdminOrPublished: Access = ({ req: { user } }) => {
  if (user && user?.roles?.includes('admin')) {
    return true
  }

  return {
    _status: {
      equals: 'published'
    }
  }
}

export const isAdminOrStripeActive: Access = ({ req: { user } }) => {
  if (user && user?.roles?.includes('admin')) {
    return true
  }

  return {
    active: {
      equals: true
    }
  }
}

export const isAdminOrUserFieldMatchingCurrentUser: Access = ({ req: { user } }) => {
  if (user) {
    if (user?.roles?.includes('admin')) return true
    return {
      user: {
        equals: user?.id
      }
    }
  }
  return false
}

export const loggedInOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published'
    }
  }
}