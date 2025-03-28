export const COLLECTION_SLUG_PRODUCTS = "products" as const;
export const COLLECTION_SLUG_PRICES = "prices" as const;
export const COLLECTION_SLUG_USER = 'users' as const

export const MAX_UNLOCKS_PER_WEEK = 3 as const;
export const UNLOCKABLE_PERMISSION_SLUGS = ["basic"] as const;

export const PricingType = {
  one_time: "One Time",
  recurring: "Recurring",
} as const;

export const PricingPlanInterval = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
} as const;

export const formatOptions = (obj: Record<string, string>) =>
  Object.entries(obj).map(([key, value]) => ({ value: key, label: value }));
