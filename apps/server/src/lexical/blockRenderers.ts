//container
import { renderer as photoCarouselBlockRenderer } from './blocks/photos_carousel_block/renderer'
import { renderer as wrapperBlockRenderer } from './blocks/wrapper_block/renderer'
import { renderer as booksCarouselBlockRenderer } from './blocks/books_carousel_block/renderer'
import { renderer as uiBlockRenderer } from './blocks/ui_block/renderer'
import { renderer as buttonsRenderer } from './blocks/button_block/renderer'
import { renderer as twoColumnsRenderer } from './blocks/two_columns_block/renderer'
import { renderer as highlightBlockRenderer } from './blocks/highlight_block/renderer'
import { renderer as gridCardsBlockRenderer } from './blocks/grid_cards_block/renderer'
import {
  photosCarouselBlock,
  gridCardsBlockSlug,
  twoColumnsBlockSlug,
  wrapperBlockSlug,
  booksCarouselBlockSlug,
  uiBlockSlug,
  buttonsSlug,
  highlightSlug
} from './blocks/slug_blogs'

export type BlockRendererFunction = <T>({ node }: any) => Promise<any>

export const blockRenderers: Record<string, BlockRendererFunction> = {
  [uiBlockSlug]: uiBlockRenderer,
  [buttonsSlug]: buttonsRenderer,
  [photosCarouselBlock]: photoCarouselBlockRenderer,
  [wrapperBlockSlug]: wrapperBlockRenderer,
  [booksCarouselBlockSlug]: booksCarouselBlockRenderer,
  [gridCardsBlockSlug]: gridCardsBlockRenderer,
  [twoColumnsBlockSlug]: twoColumnsRenderer,
  [highlightSlug]: highlightBlockRenderer
}
