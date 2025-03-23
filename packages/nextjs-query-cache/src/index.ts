// Exportar funciones principales
export { withCache } from "./withCache";
export {
  getCache,
  hasCache,
  setCache,
  invalidateCache,
  invalidateByTag,
  invalidateCacheByPrefix,
  updateCache,
  getAllCacheKeys,
  getAllCacheTags,
  clearCache,
} from "./cacheStore";

// Exportar tipos
export type { AsyncFn, CacheOptions } from "./withCache";
export type { Cache, CacheItem } from "./cacheStore";
