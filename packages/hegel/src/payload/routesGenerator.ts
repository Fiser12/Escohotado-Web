import { COLLECTION_SLUG_QUOTE, COLLECTION_SLUG_ARTICLE_WEB, COLLECTION_SLUG_BOOK, COLLECTION_SLUG_VIDEO,  } from './collectionsSlugs'
type Content = { id: number; slug?: string | null };

type ContentRelationType =
  | { collection: typeof COLLECTION_SLUG_QUOTE; value: Content }
  | { collection: typeof COLLECTION_SLUG_ARTICLE_WEB; value: Content }
  | { collection: typeof COLLECTION_SLUG_BOOK; value: Content }
  | { collection: typeof COLLECTION_SLUG_VIDEO; value: Content };


export const generateDetailHref = (field: ContentRelationType): string => {
  switch (field.collection) {
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
  nextJS: {
    generateDetailHref,
    subscriptionPageHref: "/subscriptions",
    accountPageHref: "/cuenta",
    lecturasPageHref: "/lecturas",
    videosPageHref: "/videos",
    citasPageHref: "/citas",
    homePageHref: "/",
    privacidad: "/privacidad",
    termsAndConditions: "/terminos-y-condiciones",
  },
  newsletter: {
    newsletterSubscriptionForm: `${process.env.NEWSLETTER_URL}/subscription/form`,
    newsletterSubscribersApi: `${process.env.NEWSLETTER_URL}/api/subscribers`
  },
  nodeBB: {
    root: `${process.env.FORUM_URL}`,
    syncTopicsApi: `${process.env.FORUM_URL}/api/v3/posts-sync`,
    getYoutubeVideosApi: (playlistId: string) => `${process.env.FORUM_URL}/api/v3/get-youtube-videos/${playlistId}`
  },
  otherExternal: {
    emboscadura: `https://laemboscadura.com`,
    x: `https://x.com/AEscohotado`,
    facebook: `https://www.facebook.com/profile.php?id=61555222603814`,
    instagram: `https://www.instagram.com/escohotado/`,
    youtube: `https://www.youtube.com/@AntonioEscohotadoEspinosa`
  },
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