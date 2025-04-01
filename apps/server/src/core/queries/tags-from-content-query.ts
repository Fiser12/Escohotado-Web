'use server'

import { collectionsContentsSlugs } from '@/core/collections-slugs'
import { getPayload } from '@/payload/utils/get-payload'
import { CategoryModel } from 'hegel'
import { withCache } from 'nextjs-query-cache'
import { Taxonomy } from 'payload-types'
import { mapTaxonomyToCategoryModel } from '@/core/mappers/map-taxonomy-to-category-model'

/**
 * Tipo para colecciones de contenido
 */
type ContentCollection = (typeof collectionsContentsSlugs)[number]

/**
 * Opciones para la consulta de etiquetas
 */
interface TagsQueryOptions {
  collection: ContentCollection
  query: string
  excludeSeeds?: string[]
}

/**
 * Determina la clave de campo a usar en la consulta según el tipo de colección
 */
const getQueryFieldKey = (collection: ContentCollection): string =>
  collection === 'quote' ? 'quote' : 'title'

/**
 * Crea un filtro para excluir categorías basadas en semillas específicas
 */
const filterExcludedCategories =
  (excludeSeeds: string[]) =>
  (category: Taxonomy): boolean => {
    if (!excludeSeeds.length) return true

    return !excludeSeeds.some((seed) =>
      category.breadcrumbs?.some((breadcrumb) => breadcrumb.url?.includes(seed)),
    )
  }

/**
 * Extrae categorías válidas de una taxonomía
 */
const extractCategories = (category: Taxonomy): CategoryModel[] => {
  const result = mapTaxonomyToCategoryModel(category)
  return result ? [result] : []
}

/**
 * Obtiene etiquetas de categoría basadas en una consulta de texto
 * @param collection Tipo de colección a buscar
 * @param query Texto para filtrar contenido
 * @param excludeSeeds Semillas a excluir de los resultados
 * @returns Lista de modelos de categoría únicos
 */
export const tagsFromContentQuery = async ({
  collection,
  query,
  excludeSeeds = [],
}: TagsQueryOptions): Promise<CategoryModel[]> => {
  const payload = await getPayload()
  const queryFieldKey = getQueryFieldKey(collection)

  const contentDocs = await payload.find({
    collection: collection,
    pagination: false,
    select: {
      [queryFieldKey]: true,
      categories: true,
    },
    where: {
      [queryFieldKey]: { like: query },
    },
  })

  return contentDocs.docs.flatMap((doc) => {
    const categories = doc.categories?.cast<Taxonomy>()

    if (!categories) return []

    return categories.filter(filterExcludedCategories(excludeSeeds)).flatMap(extractCategories)
  })
}

/**
 * Versión con caché de la consulta de etiquetas
 * Caché de un día completo ya que las taxonomías cambian con poca frecuencia
 */
export const tagsFromContentQueryWithCache = withCache(
  async (collection: ContentCollection, query: string, excludeSeeds: string[] = []) =>
    tagsFromContentQuery({ collection, query, excludeSeeds }),
)({
  days: 1,
  tags: ['taxonomies'],
})
