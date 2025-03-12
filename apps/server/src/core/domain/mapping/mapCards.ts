import { evalPermissionByRoleQuery } from '@/core/auth/permissions/evalPermissionByRoleQuery'
import { fetchPermittedContentQuery } from '@/core/auth/permissions/fetchPermittedContentQuery'
import { IMAGE_ERROR } from 'hegel/constants'
import {
  getAuthorsNamesFromTaxonomies,
  getMediasFromTaxonomies,
  getSelectableTaxonomies,
  getTopicsFromTaxonomies,
} from './mapTaxonomyToCategoryModel'
import { ContentCardModel, ContentHeaderModel, QuoteHeaderModel } from 'hegel'
import {
  Taxonomy,
  ArticleWeb,
  Media,
  Video,
  Book,
  Quote,
  GridCardsBlock,
  UiGridCard,
  User,
} from 'payload-types'
import 'hegel'
import { getArticlesQuery } from '@/core/content/getArticlesQuery'
import { getVideosQuery } from '@/core/content/getVideosQuery'
import { getQuotesQuery } from '@/core/content/getQuotesQuery'
import { MediaHeaderModel } from 'node_modules/hegel/src/domain/content_model'
import { routes } from 'hegel/payload'

type QueryFieldType = GridCardsBlock['queryField'][number]
type ContentRelationType = Extract<
  QueryFieldType,
  { blockType: 'staticQueryField' }
>['value'][number]

const mapRelationToFeatured = (
  user: User | null,
  item: ContentRelationType,
): ContentHeaderModel | null => {
  if (typeof item.value === 'number') {
    return null
  }
  switch (item.relationTo) {
    case 'article_web':
      return mapArticleCard(user)(item.value)
    case 'video':
      return mapVideoCard(user)(item.value)
    case 'book':
      return mapBookCard(item.value)
    case 'quote':
      return mapQuoteCard(user)(item.value)
  }
}

export const mapArticleCard =
  (user: User | null) =>
  (item: ArticleWeb): ContentHeaderModel => {
    const taxonomies = item.categories?.cast<Taxonomy>() ?? []
    return {
      type: 'article',
      id: item.id,
      title: item.title,
      isPdf: 'url' in item,
      hasPermission: evalPermissionByRoleQuery(user, item.permissions_seeds?.trim() ?? ('' as any)),
      author: getAuthorsNamesFromTaxonomies(taxonomies),
      categories: getMediasFromTaxonomies(taxonomies).concat(getTopicsFromTaxonomies(taxonomies)),
      coverHref: (item.cover as Media)?.url,
      detailHref: routes.nextJS.generateDetailHref({
        collection: 'article_web',
        value: item,
      }),
    }
  }
export const mapVideoCard =
  (user: User | null) =>
  (video: Video): ContentHeaderModel => {
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
      detailHref: routes.nextJS.generateDetailHref({ collection: 'video', value: video }),
      href: href,
    }
  }
const mapMediaCard = (item: Media): MediaHeaderModel => ({
  type: 'media',
  id: item.id,
  mediaHref: item.url,
  title: item.title,
  width: item.width,
  height: item.height,
})

const mapBookCard = (item: Book): ContentHeaderModel => {
  return {
    type: 'book',
    id: item.id,
    author: getAuthorsNamesFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    coverHref: (item.cover as Media)?.url ?? IMAGE_ERROR,
    detailHref: routes.nextJS.generateDetailHref({ collection: 'book', value: item }),
    quote: item.description ?? 'No description',
    title: item.title ?? 'No title',
  }
}
export const mapQuoteCard =
  (user: User | null) =>
  (item: Quote): QuoteHeaderModel => {
    const taxonomies = (item.categories ?? []) as Taxonomy[]

    return {
      type: 'quote',
      categories: getSelectableTaxonomies(taxonomies),
      context: item.context,
      origen:
        item.source && typeof item.source.value !== 'number'
          ? {
              title: item.source.value.title ?? 'No title',
              type: item.source.relationTo,
              hasPermissions: evalPermissionByRoleQuery(
                user,
                'permissions_seeds' in item.source.value
                  ? (item.source.value.permissions_seeds?.trim() ?? '')
                  : ('' as any),
              ),
              detailHref: routes.nextJS.generateDetailHref({
                collection: item.source.relationTo,
                value: item.source.value,
              }),
            }
          : undefined,
      id: item.id,
      author: getAuthorsNamesFromTaxonomies((item.categories ?? []) as Taxonomy[]),
      quote: item.quote,
    }
  }

const mapQueryField =
  (user: User | null) =>
  async (queryField: QueryFieldType): Promise<(ContentHeaderModel | null)[]> => {
    if (queryField.blockType === 'staticQueryField') {
      return queryField.value.map((item) => mapRelationToFeatured(user, item))
    } else if (queryField.blockType === 'mediaQueryField') {
      return queryField.value
        .map((it) => it.value)
        .cast<Media>()
        .map(mapMediaCard)
    } else if (queryField.blockType === 'articleQueryBlock') {
      const { querySize, sort, filter } = queryField
      const articulos = await getArticlesQuery(0, querySize, sort, '', filter)
      return articulos.results.map((article) => mapArticleCard(user)(article))
    } else if (queryField.blockType === 'quoteQueryBlock') {
      const { querySize, sort, filter, filterByQuoteOrigin } = queryField
      const filterByOrigin = filterByQuoteOrigin?.value as any | null
      const quotes = await getQuotesQuery(0, querySize, sort, '', filterByOrigin?.id, filter)
      return quotes.results.map((q) => mapQuoteCard(user)(q))
    } else if (queryField.blockType === 'videoQueryBlock') {
      const { querySize, sort, filter } = queryField
      const videos = await getVideosQuery(0, querySize, sort, '', filter)
      return videos.results.map((video) => mapVideoCard(user)(video))
    }

    return []
  }
export const mapCards =
  (user: User | null) =>
  async (
    gridCardsBlock: GridCardsBlock,
  ): Promise<{ gridClassname: string; features: ContentCardModel[] }> => {
    const { tailwindGridClassNames, cards } = gridCardsBlock.gridCards as UiGridCard
    const gridClassname = tailwindGridClassNames || 'grid-cols-1 md:grid-cols-4'
    const queryField: QueryFieldType[] = gridCardsBlock.queryField
    const items = (await Promise.all(queryField.map(mapQueryField(user)))).flat()

    const cardCount = (cards ?? []).length
    const features: ContentCardModel[] = []
    for (let start = 0; start < items.length; start += cardCount) {
      const chunk = items.slice(start, start + cardCount)
      const newFeatures = chunk
        .mapNotNull((item, idx) => {
          return {
            ...item,
            className: cards?.[idx]?.tailwindClassNames ?? '',
          } as ContentCardModel
        })
        .filter(Boolean)

      features.push(...newFeatures)
    }
    return {
      gridClassname,
      features,
    }
  }
