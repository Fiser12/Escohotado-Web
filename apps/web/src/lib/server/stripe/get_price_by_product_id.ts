import type { Optional } from "hegel";
import type Stripe from "stripe";
import { stripe } from "./stripe_service.js";
import { getPrice } from './get_price.js';

export async function getPriceByProductId(productId: string): Promise<Optional<Stripe.Price>> {
	const product = await stripe.products.retrieve(productId);
	if (!product.default_price) return null;
	const id = product.default_price;

	let priceId: string;
	if (typeof product.default_price === 'string') {
		priceId = product.default_price;
	} else if (product.default_price && typeof product.default_price === 'object') {
		priceId = product.default_price.id;
	} else {
		return null;
	}

	return getPrice(priceId);
}
