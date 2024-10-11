import { relativeUrls } from "$src/lib/domain/routing.js";
import type { UserModel } from "hegel";
import type Stripe from "stripe";
import { stripe } from "./stripe_service.js";


export async function createPortalSession(
	url: URL,
	user: UserModel,
	flowData?: Stripe.BillingPortal.SessionCreateParams.FlowData
) {
	const customers = await stripe.customers.list({
		email: user.email
	});
	const customer = customers.data.length ? customers.data[0] : null;

	if (!customer) {
		throw new Error(`No customer found with email: ${user.email}`);
	}

	return await stripe.billingPortal.sessions.create({
		flow_data: flowData,
		customer: customer.id,
		return_url: `${url.origin}${relativeUrls.subscriptions.list}`
	});
}
