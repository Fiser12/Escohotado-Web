//container
import { renderer as heroBlockRenderer } from "./blocks/container_blocks/hero_block/renderer"
import { renderer as wrapperBlockRenderer } from "./blocks/container_blocks/wrapper_block/renderer"
import { renderer as newsletterSubscriptionBlockRenderer } from "./blocks/container_blocks/newsletter_subscription_block/renderer"
import { renderer as booksCarouselBlockRenderer } from "./blocks/container_blocks/books_carousel_block/renderer"
import { renderer as uiBlockRenderer } from "./blocks/container_blocks/ui_block/renderer"
//content
import { renderer as twoColumnsRenderer } from "./blocks/content_blocks/two_columns_block/renderer"
import { renderer as gridCardsBlockRenderer } from "./blocks/content_blocks/grid_cards_block/renderer"
import { heroBlockSlug, gridCardsBlockSlug, twoColumnsBlockSlug, wrapperBlockSlug, newsletterSubscriptionBlockSlug, booksCarouselBlockSlug, uiBlockSlug } from "./blocks/slug_blogs"

export type BlockRendererFunction = <T>({ node }: any) => Promise<any>

export const blockRenderers: Record<string, BlockRendererFunction> = {
    //container
    [uiBlockSlug]: uiBlockRenderer,
    [heroBlockSlug]: heroBlockRenderer,
    [wrapperBlockSlug]: wrapperBlockRenderer,
    [newsletterSubscriptionBlockSlug]: newsletterSubscriptionBlockRenderer,
    [booksCarouselBlockSlug]: booksCarouselBlockRenderer,
    //content
    [gridCardsBlockSlug]: gridCardsBlockRenderer,
    [twoColumnsBlockSlug]: twoColumnsRenderer,
}