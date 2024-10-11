import { relativeUrls } from "$src/lib/domain/routing.js";
import type { UserModel } from "hegel";
import type Stripe from "stripe";
import { stripe } from "../stripe_service.js";

export async function createSubscriptionCheckout(
	url: URL,
	user: UserModel,
	priceId: string,
	quantity = 1
): Promise<Stripe.Checkout.Session> {
	return await stripe.checkout.sessions.create({
		success_url: `${url.origin}${relativeUrls.subscriptions.list}`,
		cancel_url: `${url.origin}${relativeUrls.subscriptions.list}`,
		mode: 'subscription',
		customer_email: user.email,
		client_reference_id: user.userId,
		line_items: [{ price: priceId, quantity }],
		metadata: { user_id: user.userId },
		tax_id_collection: {
			enabled: true
   	    },
		subscription_data: {
			metadata: { user_id: user.userId }
		}
	});
}
