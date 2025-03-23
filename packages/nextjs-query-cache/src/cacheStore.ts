"use server";

/**
 * Tipo para los elementos almacenados en la caché
 */
export interface CacheItem<T = any> {
  /** Timestamp de cuando se creó la entrada */
  timestamp: number;
  /** Datos almacenados */
  data: T;
  /** Tags asociados a esta entrada (solo para metadatos, no se usan para invalidación) */
  tags: string[];
}

/**
 * Estructura completa de la caché
 */
export interface Cache {
  /** Mapa de clave -> item de caché */
  items: Map<string, CacheItem<any>>;
  /** Mapa de tag -> conjunto de claves que tienen ese tag (solo para referencia, no se usa para invalidación) */
  tagIndex: Map<string, Set<string>>;
}

// Instancia única global de la caché
let cache: Cache = {
  items: new Map<string, CacheItem<any>>(),
  tagIndex: new Map<string, Set<string>>(),
};

/**
 * Función para actualizar la caché de forma avanzada
 * Permite manipulaciones complejas como modificar estructura, purgar entradas, etc.
 *
 * @param updater Función que recibe la caché actual y devuelve la caché actualizada
 * @returns La caché actualizada
 */
export const updateCache = async (updater: (cache: Cache) => Cache): Promise<Cache> => {
  cache = updater(cache);
  return cache;
};

/**
 * Obtiene un valor de la caché
 */
export const getCache = async <T = any>(
  key: string
): Promise<CacheItem<T> | undefined> => {
  return cache.items.get(key) as CacheItem<T> | undefined;
};

/**
 * Verifica si existe una clave en la caché
 */
export const hasCache = async (key: string): Promise<boolean> => {
  return cache.items.has(key);
};

/**
 * Establece un valor en la caché con tags opcionales
 */
export const setCache = async <T = any>(
  key: string,
  data: T,
  tags: string[] = []
): Promise<void> => {
  const now = Date.now();
  const item: CacheItem<T> = { timestamp: now, data, tags };

  // Almacenar el item
  cache.items.set(key, item);

  // Almacenar referencias de tags (pero no se usan para invalidación)
  for (const tag of tags) {
    if (!cache.tagIndex.has(tag)) {
      cache.tagIndex.set(tag, new Set<string>());
    }
    cache.tagIndex.get(tag)?.add(key);
  }
};

/**
 * Elimina una clave específica de la caché
 */
export const invalidateCache = async (key: string): Promise<boolean> => {
  // Si la clave no existe, no hay nada que hacer
  if (!cache.items.has(key)) {
    return false;
  }

  // Obtener los tags de la entrada
  const item = cache.items.get(key);
  if (item) {
    // Eliminar la clave de los índices de tags
    for (const tag of item.tags) {
      const keys = cache.tagIndex.get(tag);
      if (keys) {
        keys.delete(key);
        // Si no quedan claves con ese tag, eliminar el tag
        if (keys.size === 0) {
          cache.tagIndex.delete(tag);
        }
      }
    }
  }

  // Eliminar la entrada
  return cache.items.delete(key);
};

/**
 * Elimina todas las entradas que tienen un tag específico
 * Nota: Esta función está presente para compatibilidad pero no se recomienda su uso
 */
export const invalidateByTag = async (tag: string): Promise<number> => {
  console.warn(
    "invalidateByTag: Esta función está presente solo por compatibilidad y no se recomienda su uso."
  );
  return 0;
};

/**
 * Elimina todas las claves que coincidan con un prefijo
 */
export const invalidateCacheByPrefix = async (
  prefix: string
): Promise<number> => {
  const keysToDelete: string[] = [];

  // Identificar claves que comienzan con el prefijo
  for (const key of cache.items.keys()) {
    if (key.startsWith(prefix)) {
      keysToDelete.push(key);
    }
  }

  // Invalidar todas las claves identificadas
  let count = 0;
  for (const key of keysToDelete) {
    if (await invalidateCache(key)) {
      count++;
    }
  }

  return count;
};

/**
 * Obtiene todas las claves de la caché
 */
export const getAllCacheKeys = async (): Promise<string[]> => {
  return Array.from(cache.items.keys());
};

/**
 * Obtiene todos los tags utilizados en la caché
 */
export const getAllCacheTags = async (): Promise<string[]> => {
  return Array.from(cache.tagIndex.keys());
};

/**
 * Limpia toda la caché
 */
export const clearCache = async (): Promise<void> => {
  cache = {
    items: new Map<string, CacheItem<any>>(),
    tagIndex: new Map<string, Set<string>>(),
  };
  console.info("Cache cleared");
};
