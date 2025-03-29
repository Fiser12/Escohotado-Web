export interface Permission {
  id: number;
  slug?: string | null;
  title: string;
  updatedAt: string;
  createdAt: string;
}

export interface WithPermissions {
  permissions?: (number | Permission)[] | null;
  permissions_seeds?: string | null;
}

export interface Subscription {
  status?: string;
  permissions_seeds?: string | null;
}

/**
 * Tipo base para usuarios con sistema de permisos
 */
export interface BaseUser<T = any> {
  id: string | number;
  roles?: string[];
  inventory?: T;
  [key: string]: any;
}

export interface User extends BaseUser {}

export interface PayloadAccessControlConfig {
  permissionCollection?: {
    slug?: string;
  };
}

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

export interface UnlockItem {
  collection: string;
  id: number;
  dateUnlocked: Date;
  payload: any;
}

export interface FavoriteItem {
  collection: string;
  id: string;
  dateUnlocked: Date;
  payload: any;
}

export interface UserInventory {
  stripeCustomerId: string;
  subscriptions: Record<string, SubscriptionInventory>;
  products: Record<string, BoughtProduct>;
  unlocks: UnlockItem[];
  favorites: FavoriteItem[];
}

export const generateUserInventory = (customerId: string): UserInventory => ({
  stripeCustomerId: customerId,
  subscriptions: {},
  products: {},
  unlocks: [],
  favorites: [],
});
