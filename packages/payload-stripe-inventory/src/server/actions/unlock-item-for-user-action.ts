import { Payload } from "payload";
import {
  BaseUser,
  generateUserInventory,
  UnlockItem,
  UserInventory,
} from "payload-access-control";
import {
  COLLECTION_SLUG_USER,
  countWeeklyUnlocksQuery,
  MAX_UNLOCKS_PER_WEEK,
} from "../../common";
import { checkIfUserCanUnlockQuery } from "./check-if-user-can-unlock-query";
import { Result } from "hegel";

const addUniqueUnlock = (
  unlocks: UnlockItem[],
  collection: string,
  contentId: number
): UnlockItem[] => {
  const isDuplicate = unlocks.some(
    unlock => unlock.collection === collection && unlock.id === contentId
  );

  if (isDuplicate) {
    return unlocks;
  }
  return [
    ...unlocks,
    {
      collection,
      id: contentId,
      dateUnlocked: new Date(),
    },
  ];
};

export const unlockItemForUser = async (
  getPayload: () => Promise<Payload>,
  getUser: () => Promise<BaseUser | null>,
  collection: string,
  contentId: number
): Promise<Promise<Result<boolean>>> => {
  const user = await getUser();
  if (!user || !user.id) {
    return { error: "Usuario no válido" };
  }
  const payload = await getPayload();
  const item = await payload.findByID({
    collection,
    id: contentId.toString(),
  });

  if (!item) {
    return { error: "Elemento no encontrado" };
  }
  const permissions = item.permissions_seeds?.split(",") || [];

  if (!checkIfUserCanUnlockQuery(user, permissions)) {
    return { error: "No tienes permisos para desbloquear este elemento" };
  }

  const weeklyUnlocks = countWeeklyUnlocksQuery(user);
  if (weeklyUnlocks >= MAX_UNLOCKS_PER_WEEK) {
    return { error: `Has alcanzado el límite de ${MAX_UNLOCKS_PER_WEEK} desbloqueos para esta semana` };
  }

  const inventory = (user.inventory as UserInventory) ?? generateUserInventory();

  const updatedUnlocks = addUniqueUnlock(
    inventory.unlocks,
    collection,
    contentId
  );

  if (updatedUnlocks.length === inventory.unlocks.length) {
    return { data: true };
  }

  try {
    await payload.update({
      collection: COLLECTION_SLUG_USER,
      id: user.id.toString(),
      data: {
        inventory: {
          ...inventory,
          unlocks: updatedUnlocks,
        },
      },
    });

    return { data: true};
  } catch (error) {
    console.error("Error al actualizar el inventario del usuario:", error);
    return { error: "Error al actualizar el inventario del usuario" };
  }
};

