import { priceUpsert, productSync, stripe, subscriptionDeleted, subscriptionUpsert } from "@/plugins/stripe";
import { NextResponse } from "next/server";
import { Stripe } from "stripe";


export async function POST(request: Request) {
	const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!whSecret) {
		console.error('Stripe webhook secret is not set');
		return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
	}

	const signature = request.headers.get('stripe-signature') ?? '';
	const body = await request.text();

	try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(body, signature, whSecret);
		switch (event.type) {
			case 'price.created': case 'price.updated': case 'price.deleted':
				await priceUpsert(event.data.object); break
			case 'customer.subscription.created': case 'customer.subscription.updated': 
				await subscriptionUpsert(event.data.object); break
      case 'customer.subscription.deleted':
			  await subscriptionDeleted(event.data.object); break
      case 'product.created': case 'product.updated': case 'product.deleted':
        await productSync(event.data.object); break
    }
  } catch (err) {
    return NextResponse.json({ error: 'Invalid Stripe webhook', payload: err }, { status: 400 });
  }

  return NextResponse.json(
    { },
    { status: 200 }
  );
}
