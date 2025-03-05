import { COLLECTION_SLUG_ARTICLE_WEB, COLLECTION_SLUG_BOOK, COLLECTION_SLUG_VIDEO } from 'hegel/payload'
import { CollectionSlug } from 'payload'

const ARTICLE_FORUM_ID = '41'
const VIDEO_FORUM_ID = '44'
const BOOK_FORUM_IDS_MAP: Record<string, number> = {
  'el-libro-de-los-venenos': 38,
  'aprendiendo-de-las-drogas': 36,
  'caos-y-orden': 34,
  'retrato-del-libertino': 32,
  'el-espiritu-de-la-comedia': 27,
  'realidad-y-substancia': 29,
  'hitos-del-sentido': 23,
  'de-physis-a-polis': 22,
  los_enemigos_del_comercio_v3: 5,
  los_enemigos_del_comercio_v1: 5,
  los_enemigos_del_comercio_v2: 5,
  'la-forja-de-la-gloria': 37,
  'historia-elemental-de-las-drogas': 35,
  'rameras-y-esposas': 33,
  'majestades-crimenes-y-victimas': 28,
  'la-conciencia-infeliz': 26,
  'sesenta-semanas-en-el-tropico': 31,
  confesiones_de_un_opiofilo: 6,
  'historia-general-de-las-drogas-vol-1': 7,
  'historia-general-de-las-drogas-vol-2': 7,
  'mi-ibiza-privada': 42,
  'introduccion-a-los-principia-de-newton-la-antinaturaleza': 43,
}
const DEFAULT_FORUM_ID = '24'

export const getCategoryByCollection = (collection: CollectionSlug, slug: string): string => {
  if (collection === COLLECTION_SLUG_ARTICLE_WEB) return ARTICLE_FORUM_ID
  if (collection === COLLECTION_SLUG_VIDEO) return VIDEO_FORUM_ID
  if (collection === COLLECTION_SLUG_BOOK) {
    const forumId = BOOK_FORUM_IDS_MAP[slug]
    return forumId !== undefined ? forumId.toString() : DEFAULT_FORUM_ID
  }
  return '24'
}
