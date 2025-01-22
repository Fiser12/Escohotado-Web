export { productSync } from './product'
export { priceUpsert, priceDeleted } from './price'
export { subscriptionUpsert, subscriptionDeleted } from './subscription'
export { checkoutSessionCompleted } from './checkout'

import Stripe from 'stripe';

export const stripeBuilder = (): Stripe  => {
	return new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: '2024-09-30.acacia'
	})
}