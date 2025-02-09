import { stripeBuilder } from '@/payload/plugins/stripe/stripe-builder'
import { getCurrentUserQuery } from '@/core/auth/payloadUser/getCurrentUserQuery'
import { NextResponse } from 'next/server'
import { User } from 'payload-types'
import Stripe from 'stripe'
import { routes } from 'hegel'

export async function GET(request: Request) {
  const payloadUser = await getCurrentUserQuery()
  const url = new URL(request.url)
  const priceId = url.searchParams.get('priceId')
  if (!priceId || !payloadUser) throw new Error('Invalid request')

  const checkoutResult = await createSubscriptionCheckout(url, payloadUser, priceId)
  if (checkoutResult.url) return NextResponse.redirect(checkoutResult.url, 303)
  else return NextResponse.json('Create checkout url failed', { status: 406 })
}

async function createSubscriptionCheckout(
  url: URL,
  user: User,
  priceId: string,
): Promise<Stripe.Checkout.Session> {
  const stripe = stripeBuilder()

  return await stripe.checkout.sessions.create({
    success_url: `${process.env.DOMAIN}${routes.nextJS.subscriptionPageHref}`,
    cancel_url: `${process.env.DOMAIN}${routes.nextJS.subscriptionPageHref}`,
    mode: 'subscription',
    customer_email: user.email,
    client_reference_id: user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId: user.id },
    tax_id_collection: {
      enabled: true,
    },
    subscription_data: {
      metadata: { userId: user.id },
    },
  })
}
