import { BaseUser, UnlockItem, UserInventory } from "payload-access-control";
import { getPayloadSingleton } from "payload-base-singleton";
import { checkIfUserCanUnlock, countWeeklyUnlocks } from "../../common";
import { MAX_UNLOCKS_PER_WEEK } from "../../common";

/**
 * Desbloquea un elemento para un usuario si tiene permisos y no ha excedido el límite semanal
 * @param user Usuario base
 * @param collection Nombre de la colección del elemento
 * @param itemId ID del elemento a desbloquear
 * @param itemPayload Datos adicionales del elemento
 * @returns Objeto con éxito/error y mensaje
 */

export const unlockItemForUser = async (
  user: BaseUser,
  collection: string,
  itemId: number,
  itemPayload: any,
  permissions: string[] = []
): Promise<{ success: boolean; message: string }> => {
  if (!user || !user.id) {
    return { success: false, message: "Usuario no válido" };
  }

  // Verificar si el usuario puede desbloquear el elemento
  if (!checkIfUserCanUnlock(user, permissions)) {
    return {
      success: false,
      message: "No tienes permisos para desbloquear este elemento",
    };
  }

  // Verificar si el usuario ha alcanzado el límite de desbloqueos semanales
  const weeklyUnlocks = countWeeklyUnlocks(user);
  if (weeklyUnlocks >= MAX_UNLOCKS_PER_WEEK) {
    return {
      success: false,
      message: `Has alcanzado el límite de ${MAX_UNLOCKS_PER_WEEK} desbloqueos para esta semana`,
    };
  }

  // Crear el nuevo elemento desbloqueado
  const newUnlock: UnlockItem = {
    collection,
    id: itemId,
    dateUnlocked: new Date(),
    payload: itemPayload,
  };

  // Actualizar el inventario del usuario
  const inventory = user.inventory as UserInventory | undefined;
  if (!inventory) {
    return { success: false, message: "Inventario de usuario no encontrado" };
  }

  // Agregar el elemento desbloqueado al array de desbloqueos
  const updatedUnlocks = [...(inventory.unlocks || []), newUnlock];

  try {
    // Obtener la instancia de Payload
    const payload = await getPayloadSingleton();

    // Actualizar el usuario en la base de datos
    await payload.update({
      collection: "users", // Asegúrate de que esta sea la colección correcta para usuarios
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
