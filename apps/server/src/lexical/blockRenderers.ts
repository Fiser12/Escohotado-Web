//container
import { renderer as photoCarouselBlockRenderer } from './blocks/photos_carousel_block/renderer'
import { renderer as wrapperBlockRenderer } from './blocks/wrapper_block/renderer'
import { renderer as booksCarouselBlockRenderer } from './blocks/books_carousel_block/renderer'
import { renderer as uiBlockRenderer } from './blocks/ui_block/renderer'
//content
import { renderer as twoColumnsRenderer } from './blocks/two_columns_block/renderer'
import { renderer as gridCardsBlockRenderer } from './blocks/grid_cards_block/renderer'
import {
  photosCarouselBlock,
  gridCardsBlockSlug,
  twoColumnsBlockSlug,
  wrapperBlockSlug,
  booksCarouselBlockSlug,
  uiBlockSlug,
} from './blocks/slug_blogs'

export type BlockRendererFunction = <T>({ node }: any) => Promise<any>

export const blockRenderers: Record<string, BlockRendererFunction> = {
  //container
  [uiBlockSlug]: uiBlockRenderer,
  [photosCarouselBlock]: photoCarouselBlockRenderer,
  [wrapperBlockSlug]: wrapperBlockRenderer,
  [booksCarouselBlockSlug]: booksCarouselBlockRenderer,
  [gridCardsBlockSlug]: gridCardsBlockRenderer,
  //content
  [twoColumnsBlockSlug]: twoColumnsRenderer,
}
