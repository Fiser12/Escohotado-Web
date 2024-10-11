import type { UserModel } from "hegel";
import type { Prisma } from "@prisma/client";
import { prismaClient } from "../prisma_client.js";
import { stripe } from "../../stripe/stripe_service.js";

type SubscriptionCanceled = {
	isCanceled: boolean;
	cancelAt: number | null;
};

type UserSubscription = {
	priceId: string;
	subscriptionId: string;
	productId: string;
	canceled?: SubscriptionCanceled;
};

export type SubscriptionsWithItems = Prisma.StripeSubscriptionGetPayload<{
	include: {
		subscriptionItems: {
			include: {
				price: true
			}
		}
	}
}>;


export async function getSubscriptionsByUser(user: UserModel): Promise<UserSubscription[]> {
	const result = await stripe.customers.list({ email: user.email });
	const customer = result.data.length ? result.data[0] : null;
	if (!customer) return [];

	const subscriptions: SubscriptionsWithItems[] = await prismaClient.stripeSubscription.findMany({
        include: {
            subscriptionItems: {
				include: {
					price: true
				}
			}
        },
		where: {
			customer: {
				userId: user.userId
			}
		}
	});
	
	return subscriptions.flatMap((subscription) => {
		const subscriptionCanceled: SubscriptionCanceled = {
		  isCanceled: subscription.cancelAtPeriodEnd,
		  cancelAt: subscription.canceledAt,
		};
  
		return subscription.subscriptionItems.map((item) => {
		  return {
			canceled: subscriptionCanceled,
			priceId: item.price.id,
			productId: item.price.productId,
			subscriptionId: item.subscriptionId,
		  };
		});
	  }
	);
}
