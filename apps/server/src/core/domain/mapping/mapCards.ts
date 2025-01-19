import { Featured } from 'gaudi/server'
import { Taxonomy, ArticlePdf, ArticleWeb, Media, Video, Book, GridCardsBlock, UiGridCard } from 'payload-types'

const getAuthorFromTaxonomies = (taxonomies: Taxonomy[]): string => {
  return taxonomies
    .filter((taxonomy) => taxonomy.seed?.includes('autor'))
    .map((taxonomy) => taxonomy.singular_name)
    .join(', ')
}
const getMediasFromTaxonomies = (
  taxonomies: Taxonomy[],
): { id: string; singular_name: string }[] => {
  return taxonomies
    .filter((taxonomy) => taxonomy.seed?.includes('medio'))
    .map((taxonomy) => ({ id: taxonomy.id, singular_name: taxonomy.singular_name }))
}

const getTopicsFromTaxonomies = (
  taxonomies: Taxonomy[],
): { id: string; singular_name: string }[] => {
  return taxonomies
    .filter((taxonomy) => taxonomy.seed?.includes('tema'))
    .map((taxonomy) => ({ id: taxonomy.id, singular_name: taxonomy.singular_name }))
}

const imageError = 'https://placehold.co/600x300?text=Error+cargando+imagen'

const mapArticlePdfCard = (item: ArticlePdf | ArticleWeb, classNames?: string | null): Featured => {
  const taxonomies = (item.categories ?? []) as Taxonomy[]
  return {
    type: 'article',
    id: item.id,
    title: item.title,
    hasPermission: true, //TODO: check permissions
    author: getAuthorFromTaxonomies(taxonomies),
    categories: getMediasFromTaxonomies(taxonomies).concat(getTopicsFromTaxonomies(taxonomies)),
    coverHref: (item.cover as Media)?.url ?? imageError,
    href: '/articulos/' + ('slug' in item ? item.slug : item.id),
    className: classNames ?? 'col-span-1 md:col-span-2 lg:col-span-3',
  }
}
const mapVideoCard = (item: Video, classNames?: string | null): Featured => {
  return {
    type: 'video',
    id: item.id,
    title: item.title ?? 'No title',
    categories: [],
    coverHref: item.thumbnailUrl ?? imageError,
    href: '/video/' + item.id,
    className: classNames ?? 'col-span-1 md:col-span-2',
  }
}
const mapBookCard = (item: Book, classNames?: string | null): Featured => {
  return {
    type: 'book',
    id: item.id,
    author: getAuthorFromTaxonomies((item.categories ?? []) as Taxonomy[]),
    coverHref: (item.cover as Media)?.url ?? imageError,
    href: '/biblioteca/' + item.slug,
    quote: item.description ?? 'No description',
    title: item.title ?? 'No title',
    className: classNames ?? 'col-span-1 md:col-span-2',
  }
}

export const mapCards = (
  gridCardsBlock: GridCardsBlock,
): { gridClassname: string; features: Featured[] } => {
  const { tailwindGridClassNames, cards } = gridCardsBlock.gridCards as UiGridCard
  const gridClassname = tailwindGridClassNames || 'grid-cols-1 md:grid-cols-4'

  const items = gridCardsBlock.value
  const cardCount = (cards ?? []).length
  for (let start = 0; start < items.length; start += cardCount) {
    const chunk = items.slice(start, start + cardCount)
  }
  const features: Featured[] = []
  for (let start = 0; start < items.length; start += cardCount) {
    const chunk = items.slice(start, start + cardCount)

    const newFeatures = chunk.map((item, idx) => {
      const cardTailwind = cards?.[idx]?.tailwindClassNames ?? ''

      switch (item.relationTo) {
        case 'article_web':
        case 'article_pdf':
          return mapArticlePdfCard(item.value as ArticlePdf | ArticleWeb, cardTailwind)
        case 'video':
          return mapVideoCard(item.value as Video, cardTailwind)
        case 'book':
          return mapBookCard(item.value as Book, cardTailwind)
      }
    }).filter(Boolean) as Featured[]

    features.push(...newFeatures)
  }
  return {
    gridClassname,
    features,
  }
}


