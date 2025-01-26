import { buildLexical } from '@/lexical/lexicalBuilder'
import { WrapperBlock } from './blocks/container_blocks/wrapper_block/block'
import { HeroBlock } from './blocks/container_blocks/hero_block/block'
import { NewsletterSubscriptionBlock } from './blocks/container_blocks/newsletter_subscription_block/block'
import { BooksCarouselBlock } from './blocks/container_blocks/books_carousel_block/block'
import { UIBlock } from './blocks/container_blocks/ui_block/block'

export const defaultBlocks = () => [WrapperBlock, HeroBlock, NewsletterSubscriptionBlock, BooksCarouselBlock, UIBlock]

export const defaultLexical = buildLexical(defaultBlocks)
