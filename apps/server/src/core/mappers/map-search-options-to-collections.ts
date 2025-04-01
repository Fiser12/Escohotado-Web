import { SearchOptions } from '@/components/organisms/modals/search_modal_layout'
import { SearchCollection } from '@/core/queries/search-elements-query'

export const mapSearchOptionsToCollections = (option: SearchOptions): SearchCollection[] => {
  switch (option) {
    case 'all':
      return ['article_web', 'book', 'video', 'quote']
    case 'article':
      return ['article_web']
    case 'book':
      return ['book']
    case 'video':
      return ['video']
    case 'quote':
      return ['quote']
    default:
      return []
  }
}
