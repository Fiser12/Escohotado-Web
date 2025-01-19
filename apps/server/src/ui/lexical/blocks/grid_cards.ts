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
        name: 'gridCards',
        type: 'relationship',
        relationTo: 'ui_grid_cards',
        required: true,
        hasMany: false,
      },
    ],
  }