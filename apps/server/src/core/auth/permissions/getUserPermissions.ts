import { UserInventory } from 'hegel'
import { User } from 'payload-types'

export const getUserPermissions = (user: User | null): string[] => {
  const inventory = user?.inventory as UserInventory | null
  if (!inventory) return []

  return Object.values(inventory.subscriptions)
    ?.filter((subscription) => subscription.subscriptionStatus === 'active')
    ?.flatMap((subscription) => subscription.permissions)
}
