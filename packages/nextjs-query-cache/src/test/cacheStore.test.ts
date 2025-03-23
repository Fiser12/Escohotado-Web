import { describe, it, expect, beforeEach } from "vitest";
import {
  setCache,
  getCache,
  hasCache,
  invalidateCache,
  invalidateByTag,
  invalidateCacheByPrefix,
  updateCache,
  getAllCacheKeys,
  getAllCacheTags,
  clearCache,
  Cache,
} from "../index";

describe("cacheStore", () => {
  beforeEach(() => {
    clearCache();
  });

  it("debería establecer y recuperar valores de la caché", async () => {
    const testData = { foo: "bar" };
    await setCache("test-key", testData);

    const result = await getCache("test-key");

    expect(result).toBeDefined();
    expect(result?.data).toEqual(testData);
  });

  it("debería verificar correctamente si una clave existe", async () => {
    await setCache("test-key", { foo: "bar" });

    const exists = await hasCache("test-key");
    const notExists = await hasCache("nonexistent-key");

    expect(exists).toBe(true);
    expect(notExists).toBe(false);
  });

  it("debería invalidar una clave específica", async () => {
    await setCache("test-key", { foo: "bar" });
    await invalidateCache("test-key");

    const exists = await hasCache("test-key");

    expect(exists).toBe(false);
  });

  it("debería establecer y recuperar tags asociados con claves", async () => {
    await setCache("test-key1", { data: 1 }, ["tag1", "tag2"]);
    await setCache("test-key2", { data: 2 }, ["tag2", "tag3"]);

    const tags = await getAllCacheTags();

    expect(tags).toContain("tag1");
    expect(tags).toContain("tag2");
    expect(tags).toContain("tag3");
  });

  it("debería invalidar entradas por tag", async () => {
    await setCache("test-key1", { data: 1 }, ["tag1", "tag2"]);
    await setCache("test-key2", { data: 2 }, ["tag2", "tag3"]);

    await invalidateByTag("tag2");

    const key1Exists = await hasCache("test-key1");
    const key2Exists = await hasCache("test-key2");

    expect(key1Exists).toBe(false);
    expect(key2Exists).toBe(false);
  });

  it("debería invalidar entradas por prefijo de clave", async () => {
    await setCache("prefix1:key1", { data: 1 });
    await setCache("prefix1:key2", { data: 2 });
    await setCache("prefix2:key1", { data: 3 });

    await invalidateCacheByPrefix("prefix1");

    const key1Exists = await hasCache("prefix1:key1");
    const key2Exists = await hasCache("prefix1:key2");
    const key3Exists = await hasCache("prefix2:key1");

    expect(key1Exists).toBe(false);
    expect(key2Exists).toBe(false);
    expect(key3Exists).toBe(true);
  });

  it("debería listar todas las claves de caché", async () => {
    await setCache("key1", { data: 1 });
    await setCache("key2", { data: 2 });

    const keys = await getAllCacheKeys();

    expect(keys).toContain("key1");
    expect(keys).toContain("key2");
    expect(keys.length).toBe(2);
  });

  it("debería actualizar la caché con una función personalizada", async () => {
    // Configurar estado inicial de caché
    await setCache("key1", { count: 1 });
    await setCache("key2", { count: 2 });

    // Actualizar usando una función personalizada
    await updateCache((cache: Cache): Cache => {
      const items = { ...cache.items };

      // Modificar un elemento específico
      if (items["key1"]) {
        items["key1"] = {
          ...items["key1"],
          data: { count: (items["key1"].data as any).count + 10 },
        };
      }

      // Devolver nueva caché
      return {
        items,
        tags: cache.tags,
      };
    });

    // Verificar que la actualización se aplicó
    const result = await getCache("key1");

    expect(result?.data).toEqual({ count: 11 });
  });

  it("debería limpiar toda la caché", async () => {
    await setCache("key1", { data: 1 });
    await setCache("key2", { data: 2 });

    await clearCache();

    const keys = await getAllCacheKeys();

    expect(keys.length).toBe(0);
  });
});
