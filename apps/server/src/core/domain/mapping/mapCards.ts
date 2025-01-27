import { evalPermissionQuery } from '@/core/auth/permissions/evalPermissionQuery'
import { fetchPermittedContentQuery } from '@/core/auth/permissions/fetchPermittedContentQuery'
import { IMAGE_ERROR } from '@/core/constants'
import {
  getAuthorsNamesFromTaxonomies,
  getMediasFromTaxonomies,
  getTopicsFromTaxonomies,
} from '@/core/content/taxonomiesGetters'
import { Featured, FeaturedCard } from 'gaudi/client'
import 'hegel'

import {
  Taxonomy,
  ArticlePdf,
  ArticleWeb,
  Media,
  Video,
  Book,
  Quote,
  GridCardsBlock,
  UiGridCard,
  User,
} from 'payload-types'


type QueryFieldType = GridCardsBlock['queryField'][number]
type ContentRelationType = Extract<QueryFieldType, { blockType: 'staticQueryField' }>['value'][number]

const mapRelationToFeatured = (user: User | null, item: ContentRelationType): Featured | null => {
  if (typeof item.value === 'string') {
    return null
  }
  switch (item.relationTo) {
    case 'article_pdf':
    case 'article_web':
      return mapArticleCard(user)(item.value)
    case 'video':
      return mapVideoCard(user)(item.value)
    case 'book':
      return mapBookCard(item.value)
    case 'quote':
      return mapQuoteCard(item.value)
  }
}

export const mapArticleCard =
  (user: User | null) =>
  (item: ArticlePdf | ArticleWeb): Featured => {
    const taxonomies = (item.categories ?? []) as Taxonomy[]
    return {
      type: 'article',
      id: item.id,
      title: item.title,
      isPdf: 'url' in item,
      hasPermission: evalPermissionQuery(user, item.permissions_seeds?.trim() ?? ''),
      author: getAuthorsNamesFromTaxonomies(taxonomies),
      categories: getMediasFromTaxonomies(taxonomies).concat(getTopicsFromTaxonomies(taxonomies)),
      coverHref: (item.cover as Media)?.url ?? IMAGE_ERROR,
      detailHref: 'slug' in item ? `/articulos/${item.slug}` : `/articulos/pdf/${item.id}`,
      href: 'url' in item ? item.url : undefined,
    }
  }
export const mapVideoCard =
  (user: User | null) =>
  (video: Video): Featured => {
    const href = fetchPermittedContentQuery(
      user,
      video.permissions_seeds ?? '',
      video.url,
      video.url_free,
    )

    return {
      type: 'video',
      id: video.id,
      publishedAt: video.publishedAt,
      title: video.title ?? 'No title',
      categories: [],
      hasPermission: href != null && href != '',
      coverHref: video.thumbnailUrl ?? IMAGE_ERROR,
      detailHref: '/videos/' + video.id,
      href: href,
    }
  }
const mapBookCard = (item: Book): Featured => {
  return {
    type: 'book',
    id: item.id,
    author: getAuthorsNamesFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    coverHref: (item.cover as Media)?.url ?? IMAGE_ERROR,
    detailHref: '/biblioteca/' + item.slug,
    quote: item.description ?? 'No description',
    title: item.title ?? 'No title',
  }
}
const mapQuoteCard = (item: Quote): Featured => {
  return {
    type: 'quote',
    id: item.id,
    author: getAuthorsNamesFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    quote: item.quote,
  }
}

const mapQueryField =
  (user: User | null) =>
  (queryField: QueryFieldType): (Featured | null)[] => {
    if (queryField.blockType === 'staticQueryField') {
      return queryField.value.map((item) => {
        return mapRelationToFeatured(user, item)
      })
    }

    return []
  }
export const mapCards =
  (user: User | null) =>
  (gridCardsBlock: GridCardsBlock): { gridClassname: string; features: FeaturedCard[] } => {
    const { tailwindGridClassNames, cards } = gridCardsBlock.gridCards as UiGridCard
    const gridClassname = tailwindGridClassNames || 'grid-cols-1 md:grid-cols-4'
    const queryField: QueryFieldType[] = gridCardsBlock.queryField
    const items = queryField.map(mapQueryField(user)).flat()
    const cardCount = (cards ?? []).length
    const features: FeaturedCard[] = []
    for (let start = 0; start < items.length; start += cardCount) {
      const chunk = items.slice(start, start + cardCount)
      const newFeatures = chunk
        .mapNotNull((item, idx) => {
          return {
            ...item,
            className: cards?.[idx]?.tailwindClassNames ?? '',
          } as FeaturedCard
        })
        .filter(Boolean)

      features.push(...newFeatures)
    }
    return {
      gridClassname,
      features,
    }
  }
