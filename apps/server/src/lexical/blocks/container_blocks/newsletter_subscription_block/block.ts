import { Block } from 'payload'
import { newsletterSubscriptionBlockSlug } from '../../slug_blogs'

export const NewsletterSubscriptionBlock: Block = {
  slug: newsletterSubscriptionBlockSlug,
  interfaceName: 'NewsletterSubscriptionBlock',
  labels: {
    singular: 'Newsletter subscription panel',
    plural: 'Newsletter subscription panel',
  },
  fields: [
  ],
}

