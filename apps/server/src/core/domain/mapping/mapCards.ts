import { Featured } from 'gaudi/server'
import { Taxonomy, ArticlePdf, ArticleWeb, Media, Video, Book, UiGridCard } from 'payload-types'

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
  gridCards: UiGridCard[],
): { gridClassname: string; features: Featured[] }[] => {
  return (
    gridCards?.map((gridCard) => {
      return {
        gridClassname: gridCard.tailwindGridClassNames ?? 'grid-cols-1 md:grid-cols-4',
        features: gridCard.cards?.map((card) => {
            switch (card.value?.relationTo) {
              case 'article_web':
              case 'article_pdf':
                return mapArticlePdfCard(
                  card.value?.value as ArticlePdf | ArticleWeb,
                  card.tailwindClassNames,
                )
              case 'video':
                return mapVideoCard(card.value?.value as Video, card.tailwindClassNames)
              case 'book':
                return mapBookCard(card.value?.value as Book, card.tailwindClassNames)
            }
          }) ?? [],
      }
    }) ?? []
  )
}
