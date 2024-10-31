import { stripe } from "@/plugins/stripe";
import { NextResponse } from "next/server";
import { DataFromCollectionSlug } from "payload";
import { getPayloadUser } from "payload-authjs";
import { User } from "payload-types";
import Stripe from "stripe";

export async function GET(request: Request) {
    const payloadUser = await getPayloadUser<DataFromCollectionSlug<"users">>();
    const url = new URL(request.url);
    const priceId = url.searchParams.get('priceId');
    if (!priceId || !payloadUser) throw new Error('Invalid request');

    const checkoutResult = await createSubscriptionCheckout(url, payloadUser, priceId);
    if (checkoutResult.url) return NextResponse.redirect(checkoutResult.url, 303);
    else return NextResponse.json('Create checkout url failed', { status: 406 });
}

async function createSubscriptionCheckout(
    url: URL,
	user: User,
	priceId: string
): Promise<Stripe.Checkout.Session> {
	return await stripe.checkout.sessions.create({
		success_url: `${url.origin}/subscriptions`,
		cancel_url: `${url.origin}/subscriptions`,
		mode: 'subscription',
		customer_email: user.email,
		client_reference_id: user.id,
		line_items: [{ price: priceId, quantity: 1 }],
		metadata: { user_id: user.id },
		tax_id_collection: {
			enabled: true
   	    },
		subscription_data: {
			metadata: { user_id: user.id }
		}
	});
}