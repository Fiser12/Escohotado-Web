import type { Optional } from "hegel";
import type Stripe from "stripe";
import { stripe } from "./stripe_service.js";

export async function getPrice(priceId: string): Promise<Optional<Stripe.Price>> {
	if (priceId.startsWith('price_')) {
		return await stripe.prices.retrieve(priceId);
	}

	const { data } = await stripe.prices.list({
		limit: 1,
		active: true,
		lookup_keys: [priceId]
	});

	return data.length ? data[0] : null;
}
