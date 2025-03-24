import { Field } from "payload";
import { UserInventory } from "../types";

// Definición de estructura mínima para el usuario
interface BaseUserMinimal {
  id?: string | number;
  roles?: string[];
  inventory?: {
    subscriptions: Record<
      string,
      {
        subscriptionStatus: string;
        permissions: string[];
      }
    >;
  };
  [key: string]: any;
}

// Implementación interna de getUserPermissions para evitar dependencias circulares
const getPermissionsFromUser = (user: BaseUserMinimal | null): string[] => {
  if (!user) return [];

  const inventory = user?.inventory as UserInventory | undefined;
  if (!inventory) return [];

  const permissions =
    Object.values(inventory.subscriptions)
      ?.filter(subscription => subscription.subscriptionStatus === "active")
      ?.flatMap(subscription => subscription.permissions || [])
      ?.filter(Boolean) || [];

  return permissions;
};
