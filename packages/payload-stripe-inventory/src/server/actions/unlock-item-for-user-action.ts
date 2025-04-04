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
): Promise<{ success: boolean; message: string }> => {
  const user = await getUser();
  if (!user || !user.id) {
    return { success: false, message: "Usuario no válido" };
  }
  const payload = await getPayload();
  const item = await payload.findByID({
    collection,
    id: contentId.toString(),
  });

  if (!item) {
    return { success: false, message: "Elemento no encontrado" };
  }
  const permissions = item.permissions_seeds?.split(",") || [];

  // Verificar si el usuario puede desbloquear el elemento
  if (!checkIfUserCanUnlockQuery(user, permissions)) {
    return {
      success: false,
      message: "No tienes permisos para desbloquear este elemento",
    };
  }

  // Verificar si el usuario ha alcanzado el límite de desbloqueos semanales
  const weeklyUnlocks = countWeeklyUnlocksQuery(user);
  if (weeklyUnlocks >= MAX_UNLOCKS_PER_WEEK) {
    return {
      success: false,
      message: `Has alcanzado el límite de ${MAX_UNLOCKS_PER_WEEK} desbloqueos para esta semana`,
    };
  }

  // Actualizar el inventario del usuario
  const inventory =
    (user.inventory as UserInventory) ?? generateUserInventory();

  // Agregar el elemento desbloqueado al array de desbloqueos, evitando duplicados
  const updatedUnlocks = addUniqueUnlock(
    inventory.unlocks,
    collection,
    contentId
  );

  // Si no hay cambios, significa que el elemento ya estaba desbloqueado
  if (updatedUnlocks.length === inventory.unlocks.length) {
    return {
      success: true,
      message: "Este elemento ya estaba desbloqueado para ti",
    };
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

    return {
      success: true,
      message: `Elemento desbloqueado correctamente. Te quedan ${MAX_UNLOCKS_PER_WEEK - weeklyUnlocks - 1} desbloqueos esta semana`,
    };
  } catch (error) {
    console.error("Error al actualizar el inventario del usuario:", error);
    return {
      success: false,
      message: "Error al actualizar el inventario del usuario",
    };
  }
};
