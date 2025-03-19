"use server";

let cache = new Map<string, { timestamp: number; data: any }>();

export const getCache = async (): Promise<
  Map<string, { timestamp: number; data: any }>
> => {
  return cache;
};

export const setCache = async (key: string, data: any) => {
  const now = Date.now();
  cache.set(key, { timestamp: now, data });
};

export const clearCache = async () => {
  console.warn("Clearing cache");
  console.warn("Cache", cache);
  cache = new Map<string, { timestamp: number; data: any }>();
  console.warn("Cache", cache);
};
