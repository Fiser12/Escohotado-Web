import { getCache, hasCache, setCache } from "./cacheStore";

/**
 * Tipo para funciones asíncronas que se pueden cachear
 */
export type AsyncFn<T extends any[], U> = (...args: T) => Promise<U>;

/**
 * Opciones para configurar el comportamiento de la caché
 */
export interface CacheOptions {
  /** Duración en segundos */
  seconds?: number;
  /** Duración en minutos */
  minutes?: number;
  /** Duración en horas */
  hours?: number;
  /** Duración en días */
  days?: number;
  /** Prefijo personalizado para la clave de caché */
  cacheKeyPrefix?: string;
  /** Tags para asociar con las entradas de caché (para invalidación selectiva) */
  tags?: string[];
}

/**
 * Convierte las opciones de tiempo a milisegundos
 */
const convertToMilliseconds = (options: CacheOptions): number | undefined => {
  if (options.seconds) return options.seconds * 1000;
  if (options.minutes) return options.minutes * 60 * 1000;
  if (options.hours) return options.hours * 60 * 60 * 1000;
  if (options.days) return options.days * 24 * 60 * 60 * 1000;
  return undefined;
};

/**
 * Envuelve una función asíncrona con capacidades de caché (versión currificada)
 *
 * @param fn Función a cachear
 * @returns Una función currificada que primero acepta opciones y luego argumentos
 *
 * @example
 * const getCachedData = withCache(getData);
 * // Luego úsalo con opciones separadas de los argumentos
 * const data = await getCachedData({ minutes: 5 })("id-123");
 */
export const withCache = <T extends any[], U>(fn: AsyncFn<T, U>) => {
  /**
   * Función intermedia que acepta las opciones de caché
   */
  return (options: CacheOptions) => {
    /**
     * Función final que acepta los argumentos originales
     */
    return async (...args: T): Promise<U> => {
      // Generar clave de caché
      const fnName = fn.name || "anonymousFunction";
      const cacheKey = `${options.cacheKeyPrefix || fnName}:${JSON.stringify(args)}`;

      // Comprobar duración de caché
      const now = Date.now();
      const cacheDurationMs = convertToMilliseconds(options);

      // Verificar caché existente
      if (await hasCache(cacheKey)) {
        const cacheEntry = await getCache<U>(cacheKey);

        if (cacheEntry) {
          const { timestamp, data } = cacheEntry;

          // Si la caché no ha expirado, devolver los datos cacheados
          if (cacheDurationMs && now - timestamp < cacheDurationMs) {
            console.log(
              `[Cache] Hit: ${cacheKey} (${Math.round((now - timestamp) / 1000)}s old)`
            );
            return data;
          }
        }
      }

      // Ejecutar la función original
      const result = await fn(...args);

      // Guardar en caché si se especificó duración
      if (cacheDurationMs) {
        await setCache(cacheKey, result, options.tags || []);
      }

      return result;
    };
  };
};
