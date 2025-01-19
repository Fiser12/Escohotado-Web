import { Block } from "payload";

export const GridCardsBlock: Block = {
    slug: 'grid_cards',
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