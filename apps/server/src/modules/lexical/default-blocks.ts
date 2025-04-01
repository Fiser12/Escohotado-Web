
import { BooksCarouselBlock } from '@/modules/lexical/blocks/books-carousel-block/block'
import { ButtonsBlock } from '@/modules/lexical/blocks/button-block/block'
import { GridCardsBlock } from '@/modules/lexical/blocks/grid-cards-block/block'
import { HeroBlock } from '@/modules/lexical/blocks/hero-block/block'
import { HighlightBlock } from '@/modules/lexical/blocks/highlight-block/block'
import { PhotosCarouselBlock } from '@/modules/lexical/blocks/photos-carousel-block/block'
import { TwoColumnsBlock } from '@/modules/lexical/blocks/two-columns-block/block'
import { UIBlock } from '@/modules/lexical/blocks/ui-block/block'
import { WrapperBlock } from '@/modules/lexical/blocks/wrapper-block/block'

export function defaultBlocks() { 
  return [
    WrapperBlock,
    HeroBlock,
    ButtonsBlock,
    HighlightBlock,
    PhotosCarouselBlock,
    BooksCarouselBlock,
    UIBlock,
    GridCardsBlock,
    TwoColumnsBlock,
  ]
}
