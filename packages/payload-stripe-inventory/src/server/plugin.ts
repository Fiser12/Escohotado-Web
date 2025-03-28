import { stripePlugin } from '@payloadcms/plugin-stripe'
import { priceDeleted, subscriptionUpsert, subscriptionDeleted, productDeleted } from './actions';
import { BasePayload } from 'payload'

export let getPayload: () => Promise<BasePayload>;

export const plugin = (
	onSubscriptionUpdate: (type: "create" | "delete", userId: string) => Promise<void>,
	getPayloadInstance: () => Promise<BasePayload>
) => {
	getPayload = getPayloadInstance;
	return stripePlugin({
	  isTestKey: process.env.STRIPE_SECRET_KEY?.includes('sk_test'),
	  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
	  stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOK_SECRET,
	  webhooks: {
		'price.deleted': async ({event, payload}) => await priceDeleted(event.data.object, payload),
		'customer.subscription.created': async ({event, payload}) => await subscriptionUpsert(event.data.object, payload, onSubscriptionUpdate),
		'customer.subscription.paused': async ({event, payload}) => await subscriptionUpsert(event.data.object, payload, onSubscriptionUpdate),
		'customer.subscription.updated': async ({event, payload}) => await subscriptionUpsert(event.data.object, payload, onSubscriptionUpdate),
		'customer.subscription.deleted': async ({event, payload}) => await subscriptionDeleted(event.data.object, payload, onSubscriptionUpdate),
		'product.deleted': async ({event, payload}) => await productDeleted(event.data.object, payload)
	  }
	})
}
