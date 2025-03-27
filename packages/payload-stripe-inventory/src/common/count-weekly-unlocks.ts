import { BaseUser, UserInventory } from "payload-access-control";

/**
 * Cuenta cuántos elementos ha desbloqueado el usuario en los últimos 7 días
 * @param user Usuario base
 * @returns Número de elementos desbloqueados en los últimos 7 días
 */

export const countWeeklyUnlocks = (user: BaseUser): number => {
  const inventory = user?.inventory as UserInventory | undefined;
  if (!inventory || !inventory.unlocks || inventory.unlocks.length === 0) {
    return 0;
  }

  // Calcular la fecha de hace 7 días
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Contar elementos desbloqueados en los últimos 7 días
  return inventory.unlocks.filter(
    unlock => new Date(unlock.dateUnlocked) >= sevenDaysAgo
  ).length;
};
