//container
import { renderer as photoCarouselBlockRenderer } from '@/modules/lexical/blocks/photos-carousel-block/renderer'
import { renderer as wrapperBlockRenderer } from '@/modules/lexical/blocks/wrapper-block/renderer'
import { renderer as booksCarouselBlockRenderer } from '@/modules/lexical/blocks/books-carousel-block/renderer'
import { renderer as uiBlockRenderer } from '@/modules/lexical/blocks/ui-block/renderer'
import { renderer as heroBlockRenderer } from '@/modules/lexical/blocks/hero-block/renderer'
import { renderer as buttonsRenderer } from '@/modules/lexical/blocks/button-block/renderer'
import { renderer as twoColumnsRenderer } from '@/modules/lexical/blocks/two-columns-block/renderer'
import { renderer as highlightBlockRenderer } from '@/modules/lexical/blocks/highlight-block/renderer'
import { renderer as gridCardsBlockRenderer } from '@/modules/lexical/blocks/grid-cards-block/renderer'
import {
  photosCarouselBlock,
  heroBlock,
  gridCardsBlockSlug,
  twoColumnsBlockSlug,
  wrapperBlockSlug,
  booksCarouselBlockSlug,
  uiBlockSlug,
  buttonsSlug,
  highlightSlug,
  BlockSlug
} from '@/modules/lexical/blocks/slug-blogs'
import { BlocksRendererFunctions } from 'payload-lexical-blocks-builder/renderer'

export const blockRenderers: BlocksRendererFunctions<BlockSlug> = {
  [uiBlockSlug]: uiBlockRenderer,
  [heroBlock]: heroBlockRenderer,
  [buttonsSlug]: buttonsRenderer,
  [photosCarouselBlock]: photoCarouselBlockRenderer,
  [wrapperBlockSlug]: wrapperBlockRenderer,
  [booksCarouselBlockSlug]: booksCarouselBlockRenderer,
  [gridCardsBlockSlug]: gridCardsBlockRenderer,
  [twoColumnsBlockSlug]: twoColumnsRenderer,
  [highlightSlug]: highlightBlockRenderer
}
