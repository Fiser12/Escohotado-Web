import { BaseUser, UserInventory } from "../types";

/**
 * Obtiene los permisos de un usuario basados en su inventario y suscripciones activas
 */
export const getUserPermissions = (user: BaseUser | null): string[] => {
  if (!user) return [];

  const inventory = user?.inventory as UserInventory | undefined;
  if (!inventory) return [];

  const subscriptionPermissions = Object.values(inventory.subscriptions)
    ?.filter(subscription => subscription.subscriptionStatus === "active")
    ?.flatMap(subscription => subscription.permissions);

  return subscriptionPermissions;
};
