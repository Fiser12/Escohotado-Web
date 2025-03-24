// Constants
export {
  COLLECTION_SLUG_PERMISSION,
  permissionSlugs,
  PERMISSION_TYPES,
} from "./constants";

// Types
export type {
  Permission,
  WithPermissions,
  User,
  BaseUser,
  PayloadAccessControlConfig,
  Subscription,
  SubscriptionInventory,
  UserInventory
} from "./types";
export {
  generateUserInventory
} from "./types";

// Collections
export { permissionCollection } from "./collections";

// Access functions
export {
  isAdmin,
  isAnyone,
  isAdminOrCurrentUser,
  isAdminOrPublished,
  isAdminOrStripeActive,
  isAdminOrUserFieldMatchingCurrentUser,
  loggedInOrPublished,
  checkReadPermissions,
} from "./access";

// Fields
export { permissionEvaluationField } from "./fields";

// Hooks
export { cachePermissionSeedsHook, permissionRelationship } from "./fields/permissionsRelationshipFields";

// Queries
export {
  evalPermissionByRoleQuery,
  evalAdvancePermissionQuery,
  fetchPermittedContentQuery,
} from "./queries";

// Utils
export { getUserPermissions } from "./utils";
