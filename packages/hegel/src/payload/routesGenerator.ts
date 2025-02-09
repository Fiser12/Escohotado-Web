import { COLLECTION_SLUG_ARTICLE_PDF, COLLECTION_SLUG_QUOTE, COLLECTION_SLUG_ARTICLE_WEB, COLLECTION_SLUG_BOOK, COLLECTION_SLUG_VIDEO,  } from './collectionsSlugs'
type Content = { id: string; slug?: string | null };

type ContentRelationType =
  | { collection: typeof COLLECTION_SLUG_QUOTE; value: Content }
  | { collection: typeof COLLECTION_SLUG_ARTICLE_WEB; value: Content }
  | { collection: typeof COLLECTION_SLUG_ARTICLE_PDF; value: Content }
  | { collection: typeof COLLECTION_SLUG_BOOK; value: Content }
  | { collection: typeof COLLECTION_SLUG_VIDEO; value: Content };


export const generateDetailHref = (field: ContentRelationType): string => {
  switch (field.collection) {
    case 'article_pdf':
      return `/articulos/pdf/${field.value.id}`;
    case 'article_web':
      return `/articulos/${field.value.slug}`;
    case 'video':
      return `/videos/${field.value.id}`;
    case 'book':
      return `/biblioteca/${field.value.slug}`;
    case 'quote':
      return `/cita/${field.value.slug}`;
    }
};
const keyloakIssuer = `https://${process.env.KC_HOSTNAME}/realms/${process.env.KC_REALM}`

export const routes = {
  generateDetailHref,
  subscriptionPageHref: "/subscriptions",
  accountPageHref: "/cuenta",
  lecturasPageHref: "/lecturas",
  videosPageHref: "/videos",
  citasPageHref: "/citas",
  homePageHref: "/",
  keycloak: {
    issuer: keyloakIssuer,
    account: `${keyloakIssuer}/account`,
    changePassword: `${keyloakIssuer}/account/account-security/signing-in`,
    security: `${keyloakIssuer}/account/account-security/device-activity`,
    logout: `${keyloakIssuer}/protocol/openid-connect/logout`,
    loginApi: `${keyloakIssuer}/protocol/openid-connect/token`,
    roleMappingApi: (userId: string, clientId: string) => `${keyloakIssuer}/users/${userId}/role-mappings/clients/${clientId}`
  }
}