import { QuoteHeaderModel } from 'hegel'
import { BaseUser, evalPermissionByRoleQuery } from 'payload-access-control'
import { Quote, Taxonomy } from 'payload-types'
import { routes } from '@/core/routes-generator'
import { getAuthorsNamesFromTaxonomies, getSelectableTaxonomies } from '@/core/mappers/map-taxonomy-to-category-model'

export const mapQuoteCard =
  (user?: BaseUser | null) =>
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
