const SubscriptionStatus = [
  "trialing",
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "unpaid",
  "paused",
];

interface BoughtProduct {
  stripeData: {
    subscriptionId: string;
    customerId: string;
    priceId: string;
    metadata: Record<string, string>;
    createdAt: Date;
  };
  subscriptionStatus: (typeof SubscriptionStatus)[number];
  productId: number;
  permissions: string[];
}

export interface SubscriptionInventory extends BoughtProduct {
  subscriptionStripeData: {
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    endedAt: Date | null;
    cancelAt: Date | null;
    canceledAt: Date | null;
    canceledAtPeriodEnd: boolean;
    trial: {
      start: Date | null;
      end: Date | null;
    };
  };
}

export interface UserInventory {
  stripeCustomerId: string;
  subscriptions: Record<string, SubscriptionInventory>;
  products: Record<string, BoughtProduct>;
}

export const generateUserInventory = (customerId: string): UserInventory => ({
  stripeCustomerId: customerId,
  subscriptions: {},
  products: {},
});
