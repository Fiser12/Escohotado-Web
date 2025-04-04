export const COLLECTION_SLUG_PERMISSION = "permission";

export const permissionSlugs = {
  webAdmin: "web_admin"
}

// Tipos de permisos
export const PERMISSION_TYPES = {
  ALL: "all",
  ROLES: "roles",
  ONLY_NO_ROLES: "only_no_roles",
  ONLY_GUESS: "only_guess",
} as const;

export const PERMISSIONS = [
  { slug: 'free', title: 'Free' },
  { slug: 'freemium', title: 'Freemium' },
  { slug: 'tester', title: 'Tester' },
  { slug: 'dev', title: 'Developer' },
  { slug: 'basic', title: 'Basic' },
  { slug: 'admin', title: 'Admin' },
]
