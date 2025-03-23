import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  withCache,
  clearCache,
  getCache,
  invalidateByTag,
  invalidateCacheByPrefix,
} from "../index";

describe("withCache", () => {
  // Limpiar caché antes de cada prueba
  beforeEach(() => {
    clearCache();
  });

  it("debería devolver resultados de la función original en la primera llamada", async () => {
    // Función mock que siempre devuelve un valor específico
    const mockFn = vi.fn().mockResolvedValue({ data: "test-data" });
    const cachedFn = withCache(mockFn)({ minutes: 5 });

    const result = await cachedFn("test-arg");

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("test-arg");
    expect(result).toEqual({ data: "test-data" });
  });

  it("debería devolver resultados en caché en llamadas posteriores", async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: "test-data" });
    const cachedFn = withCache(mockFn)({ minutes: 5 });

    // Primera llamada - debería ejecutar la función
    await cachedFn("test-arg");
    // Segunda llamada - debería usar caché
    const result = await cachedFn("test-arg");

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: "test-data" });
  });

  it("debería respetar el tiempo de expiración", async () => {
    vi.useFakeTimers();
    const mockFn = vi.fn().mockResolvedValue({ data: "test-data" });
    const cachedFn = withCache(mockFn)({ seconds: 30 });

    // Primera llamada
    await cachedFn("test-arg");

    // Avanzar el tiempo más allá del tiempo de caché
    vi.advanceTimersByTime(31 * 1000);

    // Segunda llamada - debería ejecutar la función de nuevo
    await cachedFn("test-arg");

    expect(mockFn).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it("debería usar diferentes claves de caché para diferentes argumentos", async () => {
    const mockFn = vi
      .fn()
      .mockImplementation(arg => Promise.resolve({ data: `data-for-${arg}` }));

    const cachedFn = withCache(mockFn)({ minutes: 5 });

    const result1 = await cachedFn("arg1");
    const result2 = await cachedFn("arg2");

    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(result1).toEqual({ data: "data-for-arg1" });
    expect(result2).toEqual({ data: "data-for-arg2" });
  });

  it("debería respetar el prefijo de clave personalizado", async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: "test-data" });
    const cachedFn = withCache(mockFn)({
      minutes: 5,
      cacheKeyPrefix: "custom-prefix",
    });

    await cachedFn("test-arg");

    // Verificar que la entrada de caché existe con el prefijo correcto
    const cacheKey = 'custom-prefix:["test-arg"]';
    const cacheEntry = await getCache(cacheKey);

    expect(cacheEntry).toBeDefined();
    expect(cacheEntry?.data).toEqual({ data: "test-data" });
  });

  it("debería soportar invalidación basada en tags", async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: "test-data" });
    const cachedFn = withCache(mockFn)({
      minutes: 5,
      tags: ["test-tag", "another-tag"],
    });

    await cachedFn("test-arg");

    // Invalidar por tag
    await invalidateByTag("test-tag");

    // Debería ejecutar la función nuevamente
    await cachedFn("test-arg");

    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it("debería soportar invalidación basada en prefijo", async () => {
    const mockFn = vi.fn().mockResolvedValue({ data: "test-data" });
    const cachedFn = withCache(mockFn)({
      minutes: 5,
      cacheKeyPrefix: "test-prefix",
    });

    await cachedFn("test-arg");

    // Invalidar por prefijo
    await invalidateCacheByPrefix("test-prefix");

    // Debería ejecutar la función nuevamente
    await cachedFn("test-arg");

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
