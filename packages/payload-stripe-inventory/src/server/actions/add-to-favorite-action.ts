import { BaseUser, FavoriteItem, UserInventory } from "payload-access-control";
import { getPayloadSingleton } from "payload-base-singleton";

/**
 * Agrega un elemento a los favoritos del usuario
 * @param user Usuario base
 * @param collection Nombre de la colección del elemento
 * @param itemId ID del elemento a marcar como favorito
 * @param itemPayload Datos adicionales del elemento
 * @returns Objeto con éxito/error y mensaje
 */
export const addToFavorites = async (
  user: BaseUser,
  collection: string,
  itemId: string,
  itemPayload: any
): Promise<{ success: boolean; message: string }> => {
  if (!user || !user.id) {
    return { success: false, message: "Usuario no válido" };
  }

  const newFavorite: FavoriteItem = {
    collection,
    id: itemId,
    dateUnlocked: new Date(),
    payload: itemPayload,
  };

  const inventory = user.inventory as UserInventory | undefined;
  if (!inventory) {
    return { success: false, message: "Inventario de usuario no encontrado" };
  }

  const existingFavorite = inventory.favorites?.find(
    fav => fav.collection === collection && fav.id === itemId
  );

  if (existingFavorite) {
    return {
      success: false,
      message: "Este elemento ya está en tus favoritos",
    };
  }

  const updatedFavorites = [...(inventory.favorites || []), newFavorite];

  try {
    const payload = await getPayloadSingleton();

    await payload.update({
      collection: "users",
      id: user.id.toString(),
      data: {
        inventory: {
          ...inventory,
          favorites: updatedFavorites,
        },
      },
    });

    return {
      success: true,
      message: "Elemento agregado a favoritos correctamente",
    };
  } catch (error) {
    console.error("Error al actualizar los favoritos del usuario:", error);
    return {
      success: false,
      message: "Error al actualizar los favoritos del usuario",
    };
  }
};
