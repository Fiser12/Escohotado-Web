import {
  getCache,
  setCache,
} from "./cacheFn";
export type AsyncFn<T extends any[], U> = (...args: T) => Promise<U>;
export interface CacheOptions {
  minutes?: number;
  seconds?: number;
  hours?: number;
  days?: number;
  cacheKeyPrefix?: string;
}

const convertToMilliseconds = (options: CacheOptions): number | undefined => {
  if (options.seconds) return options.seconds * 1000;
  if (options.minutes) return options.minutes * 60 * 1000;
  if (options.hours) return options.hours * 60 * 60 * 1000;
  if (options.days) return options.days * 24 * 60 * 60 * 1000;
  return undefined;
};

export const withCache = <T extends any[], U>(fn: AsyncFn<T, U>) => {
  return async (options: CacheOptions, ...args: T): Promise<U> => {
    const cacheKey = `${options.cacheKeyPrefix || fn.name}:${JSON.stringify(args)}`;
    const now = Date.now();

    const cacheDurationMs = convertToMilliseconds(options);
    const cache = await getCache();

    if (cache.has(cacheKey)) {
      const { timestamp, data } = cache.get(cacheKey)!;
      if (cacheDurationMs && now - timestamp < cacheDurationMs) {
        console.warn("Cache", "Using cached data for key ", cacheKey);
        return data;
      }
    }

    const result = await fn(...args);
    if (cacheDurationMs) {
      await setCache(cacheKey, result);
    }

    return result;
  };
};
