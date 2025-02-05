import type Stripe from 'stripe'
import { subscriptionUpsert } from './subscription'
import { stripeBuilder } from '@/payload/plugins/stripe/stripe-builder'
import { getPayload } from '@/payload/utils/getPayload'

const logs = false

export const checkoutSessionCompleted = async (checkoutSession: Stripe.Checkout.Session) => {
  const payload = await getPayload()
  const subscriptionId =
    typeof checkoutSession.subscription === 'string'
      ? checkoutSession.subscription
      : checkoutSession.subscription?.id

  if (!subscriptionId || checkoutSession.mode !== 'subscription') return

  try {
    const subscription = await stripeBuilder().subscriptions.retrieve(subscriptionId)

    if (subscription!) return
    await subscriptionUpsert(subscription)

    if (logs)
      payload.logger.info(
        `✅ Successfully managed subscription status change for session ${checkoutSession.id}`,
      )
  } catch (error) {
    payload.logger.error(`- Error fetching subscription from Stripe: ${error}`)
  }
}
