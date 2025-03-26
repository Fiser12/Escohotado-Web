import { getCurrentUserQuery } from '@/core/auth/payloadUser/getCurrentUserQuery'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { routes } from '@/core/routesGenerator'
import { BaseUser } from 'payload-access-control'
import { stripeBuilder } from 'payload-stripe-inventory'

export async function GET(request: Request) {
  const payloadUser = await getCurrentUserQuery()
  if (!payloadUser) throw new Error('You must be logged in to access this page')
  const url = new URL(request.url)
  const cancelSubscriptionId = url.searchParams.get('cancelSubscriptionId')
  const updateSubscriptionId = url.searchParams.get('updateSubscriptionId')

  let flowData: Stripe.BillingPortal.SessionCreateParams.FlowData | undefined
  if (cancelSubscriptionId)
    flowData = {
      type: 'subscription_cancel',
      subscription_cancel: { subscription: cancelSubscriptionId },
    }
  else if (updateSubscriptionId)
    flowData = {
      type: 'subscription_update',
      subscription_update: { subscription: updateSubscriptionId },
    }

  const session = await createPortalSession(payloadUser, flowData)
  return NextResponse.redirect(session.url, 303)
}

async function createPortalSession(
  user: BaseUser,
  flowData?: Stripe.BillingPortal.SessionCreateParams.FlowData,
) {
  const stripe = stripeBuilder()

  const customers = await stripe.customers.list({
    email: user.email,
  })
  const customer = customers.data.length ? customers.data[0] : null

  if (!customer) {
    throw new Error(`No customer found with email: ${user.email}`)
  }

  return await stripe.billingPortal.sessions.create({
    flow_data: flowData,
    customer: customer.id,
    return_url: `${process.env.DOMAIN}${routes.nextJS.subscriptionPageHref}`,
  })
}
