import { Access } from "payload";
import { permissionSlugs } from "../constants";
import { getUserPermissions } from "../utils/getUserPermissions";

export const isAdmin: Access = ({ req }) => {
  return req?.user?.roles?.includes(permissionSlugs.webAdmin) || false;
};

export const isAnyone: Access = () => true;

export const isAdminOrCurrentUser: Access = ({ req }) => {
  if (req?.user?.roles?.includes(permissionSlugs.webAdmin)) return true;
  return { id: { equals: req.user?.id } };
};

export const isAdminOrPublished: Access = ({ req: { user } }) => {
  if (user && user?.roles?.includes(permissionSlugs.webAdmin)) {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  };
};

export const isAdminOrStripeActive: Access = ({ req: { user } }) => {
  if (user && user?.roles?.includes(permissionSlugs.webAdmin)) {
    return true;
  }

  return {
    active: {
      equals: true,
    },
  };
};

export const isAdminOrUserFieldMatchingCurrentUser: Access = ({
  req: { user },
}) => {
  if (user) {
    if (user?.roles?.includes(permissionSlugs.webAdmin)) return true;
    return {
      user: {
        equals: user?.id,
      },
    };
  }
  return false;
};

export const loggedInOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  };
};

export const checkReadPermissions: Access = (props) => {
  if(isAdmin(props)) return true
  const userPermissions = getUserPermissions(props.req.user)
  return {or: [
    {permissions_seeds: { equals: "" }},
    ...userPermissions.map(perm => ({ permissions_seeds: { contains: perm }}))
  ]}
}
