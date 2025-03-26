import { NextResponse } from "next/server";
import Stripe from "stripe";
import { BaseUser } from "payload-access-control";
import { UserInventory } from "payload-access-control";
import { stripeBuilder } from "../utils/stripe-builder";
import { getPayloadSingleton } from "payload-base-singleton";

// Checkout handler
export async function handleCheckout(
  request: Request,
  getCurrentUser: () => Promise<BaseUser | null>,
  getRoutes: () => { nextJS: { subscriptionPageHref: string } }
) {
  const payloadUser = await getCurrentUser();
  const url = new URL(request.url);
  const priceId = url.searchParams.get("priceId");
  if (!priceId || !payloadUser) throw new Error("Invalid request");

  const checkoutResult = await createSubscriptionCheckout(
    payloadUser,
    priceId,
    getRoutes
  );
  if (checkoutResult.url) return NextResponse.redirect(checkoutResult.url, 303);
  else return NextResponse.json("Create checkout url failed", { status: 406 });
}

async function createSubscriptionCheckout(
  user: BaseUser,
  priceId: string,
  getRoutes: () => { nextJS: { subscriptionPageHref: string } }
): Promise<Stripe.Checkout.Session> {
  const stripe = stripeBuilder();
  const routes = getRoutes();

  return await stripe.checkout.sessions.create({
    success_url: `${process.env.DOMAIN}${routes.nextJS.subscriptionPageHref}?refresh=true`,
    cancel_url: `${process.env.DOMAIN}${routes.nextJS.subscriptionPageHref}?refresh=true`,
    mode: "subscription",
    customer_email: user.email,
    client_reference_id: String(user.id),
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId: user.id },
    tax_id_collection: {
      enabled: true,
    },
    subscription_data: {
      metadata: { userId: user.id },
    },
  });
}

// Portal handler
export async function handlePortal(
  request: Request,
  getCurrentUser: () => Promise<BaseUser | null>,
  getRoutes: () => { nextJS: { subscriptionPageHref: string } }
) {
  const payloadUser = await getCurrentUser();
  if (!payloadUser)
    throw new Error("You must be logged in to access this page");
  const url = new URL(request.url);
  const cancelSubscriptionId = url.searchParams.get("cancelSubscriptionId");
  const updateSubscriptionId = url.searchParams.get("updateSubscriptionId");

  let flowData: Stripe.BillingPortal.SessionCreateParams.FlowData | undefined;
  if (cancelSubscriptionId)
    flowData = {
      type: "subscription_cancel",
      subscription_cancel: { subscription: cancelSubscriptionId },
    };
  else if (updateSubscriptionId)
    flowData = {
      type: "subscription_update",
      subscription_update: { subscription: updateSubscriptionId },
    };

  const session = await createPortalSession(payloadUser, flowData, getRoutes);
  return NextResponse.redirect(session.url, 303);
}

async function createPortalSession(
  user: BaseUser,
  flowData: Stripe.BillingPortal.SessionCreateParams.FlowData | undefined,
  getRoutes: () => { nextJS: { subscriptionPageHref: string } }
) {
  const stripe = stripeBuilder();
  const routes = getRoutes();

  const customers = await stripe.customers.list({
    email: user.email,
  });
  const customer = customers.data.length ? customers.data[0] : null;

  if (!customer) {
    throw new Error(`No customer found with email: ${user.email}`);
  }

  return await stripe.billingPortal.sessions.create({
    flow_data: flowData,
    customer: customer.id,
    return_url: `${process.env.DOMAIN}${routes.nextJS.subscriptionPageHref}`,
  });
}

// Update handler
export async function handleUpdate(
  request: Request,
  getCurrentUser: () => Promise<BaseUser | null>,
  getRoutes: () => { nextJS: { subscriptionPageHref: string } }
) {
  const payloadUser = await getCurrentUser();
  if (!payloadUser)
    throw new Error("You must be logged in to access this page");
  const url = new URL(request.url);
  const subscriptionId = url.searchParams.get("subscriptionId");
  const cancelAtPeriodEnd =
    url.searchParams.get("cancelAtPeriodEnd") === "true";
  if (!subscriptionId) throw Error("SubscriptionId could not be found.");

  await stripeBuilder().subscriptions.update(subscriptionId, {
    cancel_at_period_end: cancelAtPeriodEnd,
  });

  const inventory = payloadUser.inventory as UserInventory | null;
  if (inventory) {
    inventory.subscriptions[
      subscriptionId
    ].subscriptionStripeData.canceledAtPeriodEnd = cancelAtPeriodEnd;
  }

  const payload = await getPayloadSingleton();
  await payload.update({
    collection: "users",
    data: {
      inventory: inventory as any,
    },
    where: { id: { equals: payloadUser.id } },
  });

  const routes = getRoutes();
  return NextResponse.redirect(
    `${process.env.DOMAIN}${routes.nextJS.subscriptionPageHref}`,
    303
  );
}
