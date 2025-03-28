"use server";

import { BaseUser } from "payload-access-control";
import { unlockItemForUser } from "../actions/unlock-item-for-user-action";
import { addToFavorites } from "./add-to-favorite-action";

/**
 * Acción del servidor para desbloquear un elemento
 */
export async function unlockItem(
  user: BaseUser,
  collection: string,
  itemId: number,
  itemPayload: any,
  permissions: string[] = []
) {
  if (!user || !user.id) {
    return {
      success: false,
      message: "Usuario no autenticado",
    };
  }

  try {
    // Utilizar la función existente para desbloquear
    return await unlockItemForUser(
      user,
      collection,
      itemId,
      itemPayload,
      permissions
    );
  } catch (error) {
    console.error("Error en la acción de desbloqueo:", error);
    return {
      success: false,
      message: "Error al procesar la solicitud de desbloqueo",
    };
  }
}

/**
 * Acción del servidor para agregar un elemento a favoritos
 */
export async function favoriteItem(
  user: BaseUser,
  collection: string,
  itemId: string,
  itemPayload: any
) {
  if (!user || !user.id) {
    return {
      success: false,
      message: "Usuario no autenticado",
    };
  }

  try {
    // Utilizar la función existente para agregar a favoritos
    return await addToFavorites(user, collection, itemId, itemPayload);
  } catch (error) {
    console.error("Error en la acción de favoritos:", error);
    return {
      success: false,
      message: "Error al procesar la solicitud de favoritos",
    };
  }
}
