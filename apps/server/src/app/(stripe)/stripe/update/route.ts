import { NextResponse } from 'next/server'
import { getCurrentUserQuery } from "@/core/auth/payloadUser/getCurrentUserQuery";
import { getPayload } from '@/payload/utils/getPayload';
import { stripeBuilder } from '@/payload/plugins/stripe/stripe-builder'
import { routes } from '@/core/routesGenerator';
import { UserInventory } from 'payload-access-control';

export async function GET(request: Request) {
  const payloadUser = await getCurrentUserQuery()
  if (!payloadUser) throw new Error('You must be logged in to access this page')
  const url = new URL(request.url)
  const subscriptionId = url.searchParams.get('subscriptionId')
  const cancelAtPeriodEnd = url.searchParams.get('cancelAtPeriodEnd') === 'true'
  if (!subscriptionId) throw Error('SubscriptionId could not be found.')
  await stripeBuilder().subscriptions.update(subscriptionId, {
    cancel_at_period_end: cancelAtPeriodEnd,
  })
  const inventory = payloadUser.inventory as UserInventory | null
  if(inventory) {
    inventory.subscriptions[subscriptionId].subscriptionStripeData.canceledAtPeriodEnd = cancelAtPeriodEnd
  }
  const payload = await getPayload()
  await payload.update({
    collection: 'users',
    data: {
      inventory: inventory as any,
    },
    where: { id: { equals: payloadUser.id } },
  })
  return NextResponse.redirect(`${process.env.DOMAIN}${routes.nextJS.subscriptionPageHref}`, 303)
}
