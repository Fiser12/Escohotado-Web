import { quoteOriginRelationTo } from '@/payload/collections/content/quote'
import { Field } from 'payload'

export const filterByQuoteOriginField: Field = {
  name: 'filterByQuoteOrigin',
  label: 'Filtro',
  type: 'relationship',
  relationTo: quoteOriginRelationTo
}

