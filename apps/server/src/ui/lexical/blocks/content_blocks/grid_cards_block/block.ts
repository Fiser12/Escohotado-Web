import { Block } from "payload";
import { gridCardsBlockSlug } from "../../slug_blogs";

export const GridCardsBlock: Block = {
  slug: gridCardsBlockSlug,
  interfaceName: 'GridCardsBlock',
  labels: {
    singular: 'Grid de cards',
    plural: 'Grid de cards'
  },
  fields: [
    {
      type: 'relationship',
      name: 'value',
      relationTo: ['article_web', 'article_pdf', 'book', 'video'],
      required: true,
      hasMany: true,
      admin: {
        allowCreate: false,
      }
    },
    {
      name: 'gridCards',
      type: 'relationship',
      relationTo: 'ui_grid_cards',
      required: true,
      hasMany: false,
    },
  ],
}
