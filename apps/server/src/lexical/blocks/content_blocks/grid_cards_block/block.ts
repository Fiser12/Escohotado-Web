import { Block } from "payload";
import { gridCardsBlockSlug } from "../../slug_blogs";
import { queryField } from "../query_field";

export const GridCardsBlock: Block = {
  slug: gridCardsBlockSlug,
  interfaceName: 'GridCardsBlock',
  labels: {
    singular: 'Grid de cards',
    plural: 'Grid de cards'
  },
  fields: [
    queryField,
    {
      name: 'gridCards',
      type: 'relationship',
      relationTo: 'ui_grid_cards',
      required: true,
      hasMany: false,
    },
  ],
}
