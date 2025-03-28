//container
import { renderer as photoCarouselBlockRenderer } from './blocks/photos_carousel_block/renderer'
import { renderer as wrapperBlockRenderer } from './blocks/wrapper_block/renderer'
import { renderer as booksCarouselBlockRenderer } from './blocks/books_carousel_block/renderer'
import { renderer as uiBlockRenderer } from './blocks/ui_block/renderer'
import { renderer as heroBlockRenderer } from './blocks/hero_block/renderer'
import { renderer as buttonsRenderer } from './blocks/button_block/renderer'
import { renderer as twoColumnsRenderer } from './blocks/two_columns_block/renderer'
import { renderer as highlightBlockRenderer } from './blocks/highlight_block/renderer'
import { renderer as gridCardsBlockRenderer } from './blocks/grid_cards_block/renderer'
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
} from './blocks/slug_blogs'
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
