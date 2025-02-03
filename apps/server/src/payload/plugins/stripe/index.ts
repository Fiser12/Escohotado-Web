export { productSync } from './product'
export { priceUpsert, priceDeleted } from './price'
export { subscriptionUpsert, subscriptionDeleted } from './subscription'
export { checkoutSessionCompleted } from './checkout'
import { stripePlugin } from '@payloadcms/plugin-stripe'

import Stripe from 'stripe';
import { priceDeleted } from './price'
import { productDeleted } from './product'
import { subscriptionUpsert, subscriptionDeleted } from './subscription'

export const stripeBuilder = (): Stripe  => {
	return new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: '2024-09-30.acacia'
	})
}

const plugin = stripePlugin({
	  isTestKey: process.env.STRIPE_SECRET_KEY?.includes('sk_test'),
	  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
	  stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET,
	  webhooks: {
		'price.deleted': async ({event}) => await priceDeleted(event.data.object),
		'customer.subscription.created': async ({event}) => await subscriptionUpsert(event.data.object),
		'customer.subscription.paused': async ({event}) => await subscriptionUpsert(event.data.object),
		'customer.subscription.updated': async ({event}) => await subscriptionUpsert(event.data.object),
		'customer.subscription.deleted': async ({event}) => await subscriptionDeleted(event.data.object),
		'product.deleted': async ({event}) => await productDeleted(event.data.object)
	  }
	}
)

export default plugin