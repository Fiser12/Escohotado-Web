//container
import { renderer as heroBlockRenderer } from "./blocks/container_blocks/hero_block/renderer"
import { renderer as wrapperBlockRenderer } from "./blocks/container_blocks/wrapper_block/renderer"
import { renderer as newsletterSubscriptionBlockRenderer } from "./blocks/container_blocks/newsletter_subscription_block/renderer"
//content
import { renderer as twoColumnsRenderer } from "./blocks/content_blocks/two_columns_block/renderer"
import { renderer as gridCardsBlockRenderer } from "./blocks/content_blocks/grid_cards_block/renderer"
import { heroBlockSlug, gridCardsBlockSlug, twoColumnsBlockSlug, wrapperBlockSlug, newsletterSubscriptionBlockSlug } from "./blocks/slug_blogs"

export type BlockRendererFunction = <T>({ node }: any) => Promise<JSX.Element>

export const blockRenderers: Record<string, BlockRendererFunction> = {
    //container
    [heroBlockSlug]: heroBlockRenderer,
    [wrapperBlockSlug]: wrapperBlockRenderer,
    [newsletterSubscriptionBlockSlug]: newsletterSubscriptionBlockRenderer,
    //content
    [gridCardsBlockSlug]: gridCardsBlockRenderer,
    [twoColumnsBlockSlug]: twoColumnsRenderer,
}