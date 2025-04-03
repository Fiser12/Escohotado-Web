export const COLLECTION_SLUG_PERMISSION = "permission";


// Tipos de permisos
export const QUERY_PERMISSION_TYPES = {
  ALL: "all",
  ROLES: "roles",
  ONLY_NO_ROLES: "only_no_roles",
  ONLY_GUESS: "only_guess",
} as const;

const FREEMIUM_PERMISSION = "freemium"
const FREE_PERMISSION = "free"
const TESTER_PERMISSION = "tester"
const DEV_PERMISSION = "dev"
const BASIC_PERMISSION = "basic"
const ADMIN_PERMISSION = "admin"

export const permissionSlugs = {
  webAdmin: ADMIN_PERMISSION,
  dev: DEV_PERMISSION,
  tester: TESTER_PERMISSION,
  free: FREE_PERMISSION,
  freemium: FREEMIUM_PERMISSION,
  basic: BASIC_PERMISSION,
}

export const PERMISSIONS = [
  { slug: FREE_PERMISSION, title: 'Free' },
  { slug: FREEMIUM_PERMISSION, title: 'Freemium' },
  { slug: TESTER_PERMISSION, title: 'Tester' },
  { slug: DEV_PERMISSION, title: 'Developer' },
  { slug: BASIC_PERMISSION, title: 'Basic' },
  { slug: ADMIN_PERMISSION, title: 'Admin' },
]
