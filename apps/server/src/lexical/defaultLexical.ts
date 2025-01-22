import { buildLexical } from '@/lexical/lexicalBuilder'
import { WrapperBlock } from './blocks/container_blocks/wrapper_block/block'
import { HeroBlock } from './blocks/container_blocks/hero_block/block'
import { NewsletterSubscriptionBlock } from './blocks/container_blocks/newsletter_subscription_block/block'

export const defaultBlocks = () => [WrapperBlock, HeroBlock, NewsletterSubscriptionBlock]

export const defaultLexical = buildLexical(defaultBlocks)
