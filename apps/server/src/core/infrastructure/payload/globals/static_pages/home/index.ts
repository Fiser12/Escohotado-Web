import { GridCardsBlock } from "@/ui/lexical/blocks/grid_cards_block";
import { HeroBlock } from "@/ui/lexical/blocks/hero_block";
import { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
    slug: 'home_page',
    label: 'Página de inicio',
    versions: false,
    fields: [
      {
        name: 'content',
        type: 'richText',
      }
    ]
  }
  