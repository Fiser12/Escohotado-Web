import { stripeBuilder } from "@/plugins/stripe";
import { NextResponse } from "next/server";
import { DataFromCollectionSlug } from "payload";
import { getPayloadUser } from "@/plugins/authjs/getPayloadUser";
import { getPayload } from "@/utils/payload";

export async function GET(request: Request) {
    const payloadUser = await getPayloadUser<DataFromCollectionSlug<"users">>();
    if (!payloadUser) throw new Error('You must be logged in to access this page');
    const url = new URL(request.url);
    const subscriptionId = url.searchParams.get('subscriptionId');
	const cancelAtPeriodEnd = url.searchParams.get('cancelAtPeriodEnd') === 'true';
	if (!subscriptionId) throw Error('SubscriptionId could not be found.');
	await stripeBuilder().subscriptions.update(subscriptionId, {
		cancel_at_period_end: cancelAtPeriodEnd
	});
    const payload = await getPayload();
    await payload.update({
        collection: "subscriptions",
        data: {
            cancelAtPeriodEnd: cancelAtPeriodEnd
        },
        where: { stripeID: { equals: subscriptionId } },
    })
    return NextResponse.redirect(`${url.origin}/subscriptions`, 303);
}

