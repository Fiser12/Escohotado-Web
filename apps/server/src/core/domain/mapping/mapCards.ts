import { evalPermissionQuery } from '@/core/auth/permissions/evalPermissionQuery'
import { fetchPermittedContentQuery } from '@/core/auth/permissions/fetchPermittedContentQuery'
import { getAuthorsNamesFromTaxonomies, getMediasFromTaxonomies, getTopicsFromTaxonomies } from '@/core/content/taxonomiesGetters'
import { consolidateHTMLConverters, convertLexicalToHTML } from '@payloadcms/richtext-lexical'
import { Featured } from 'gaudi/server'
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


const imageError = 'https://placehold.co/600x300?text=Error+cargando+imagen'

export const mapArticleCard =
  (user: User | null) =>
  (item: ArticlePdf | ArticleWeb, classNames?: string | null): Featured => {
    const taxonomies = (item.categories ?? []) as Taxonomy[]
    return {
      type: 'article',
      id: item.id,
      title: item.title,
      isPdf: 'url' in item,
      hasPermission: evalPermissionQuery(user, item.permissions_seeds?.trim() ?? ''),
      author: getAuthorsNamesFromTaxonomies(taxonomies),
      categories: getMediasFromTaxonomies(taxonomies).concat(getTopicsFromTaxonomies(taxonomies)),
      coverHref: (item.cover as Media)?.url ?? imageError,
      detailHref: ('slug' in item ? `/articulos/${item.slug}` : `/articulos/pdf/${item.id}`),
      href: 'url' in item ? item.url : undefined,
      className: classNames ?? 'col-span-1 md:col-span-2 lg:col-span-3',
    }
  }
export const mapVideoCard =
  (user: User | null) =>
  (video: Video, classNames?: string | null): Featured => {
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
      coverHref: video.thumbnailUrl ?? imageError,
      detailHref: '/videos/' + video.id,
      href: href,
      className: classNames ?? 'col-span-1 md:col-span-2',
    }
  }
const mapBookCard = (item: Book, classNames?: string | null): Featured => {
  return {
    type: 'book',
    id: item.id,
    author: getAuthorsNamesFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    coverHref: (item.cover as Media)?.url ?? imageError,
    detailHref: '/biblioteca/' + item.slug,
    quote: item.description ?? 'No description',
    title: item.title ?? 'No title',
    className: classNames ?? 'col-span-1 md:col-span-2',
  }
}
const mapQuoteCard = (item: Quote, classNames?: string | null): Featured => {
  return {
    type: 'quote',
    id: item.id,
    className: classNames ?? 'col-span-1 md:col-span-2',
    author: getAuthorsNamesFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    quote: item.quote
  }
}


export const mapCards =
  (user: User | null) =>
  (gridCardsBlock: GridCardsBlock): { gridClassname: string; features: Featured[] } => {
    const { tailwindGridClassNames, cards } = gridCardsBlock.gridCards as UiGridCard
    const gridClassname = tailwindGridClassNames || 'grid-cols-1 md:grid-cols-4'

    const items = gridCardsBlock.value
    const cardCount = (cards ?? []).length
    const features: Featured[] = []
    for (let start = 0; start < items.length; start += cardCount) {
      const chunk = items.slice(start, start + cardCount)

      const newFeatures = chunk
        .map((item, idx) => {
          const cardTailwind = cards?.[idx]?.tailwindClassNames ?? ''

          switch (item.relationTo) {
            case 'article_web':
            case 'article_pdf':
              return mapArticleCard(user)(item.value as ArticlePdf | ArticleWeb, cardTailwind)
            case 'video':
              return mapVideoCard(user)(item.value as Video, cardTailwind)
            case 'book':
              return mapBookCard(item.value as Book, cardTailwind)
            case 'quote':
              return mapQuoteCard(item.value as Quote, cardTailwind)
          }
        })
        .filter(Boolean)

      features.push(...newFeatures)
    }
    return {
      gridClassname,
      features,
    }
  }
