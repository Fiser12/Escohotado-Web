# nextjs-query-cache

Una solución de caché en memoria para funciones asíncronas en Next.js que soporta invalidación basada en etiquetas, tiempo de expiración personalizable y actualizaciones avanzadas.

## Características

- ✅ Caché en memoria para funciones asíncronas
- ✅ Invalidación basada en etiquetas
- ✅ Tiempo de expiración configurable (segundos, minutos, horas, días)
- ✅ Prefijos de clave personalizables
- ✅ API simple y flexible
- ✅ Completamente tipado (TypeScript)
- ✅ Funciona en server components y API routes

## Instalación

```bash
npm install nextjs-query-cache
```

## Uso básico

```typescript
import { withCache } from 'nextjs-query-cache';

// Función original que hace una petición costosa
const fetchData = async (id: string) => {
  // Petición a base de datos o API externa
  const data = await db.query('SELECT * FROM items WHERE id = ?', [id]);
  return data;
};

// Versión cacheada de la función
const getCachedData = withCache(fetchData)({
  minutes: 5, // 5 minutos de duración de caché
  tags: ['items'] // Tags para invalidación
});

// Uso
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id') || '1';
  
  // Los resultados se almacenarán en caché automáticamente
  const data = await getCachedData(id);
  
  return Response.json(data);
}
```

## Opciones de caché

El método `withCache` es currificado y acepta las siguientes opciones:

```typescript
interface CacheOptions {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  cacheKeyPrefix?: string;
  tags?: string[];
}
```

## Invalidación de caché

### Invalidar por clave

```typescript
import { invalidateCache } from 'nextjs-query-cache';

// Invalidar una entrada específica
await invalidateCache('clave-específica');
```

### Invalidar por etiqueta

```typescript
import { invalidateByTag } from 'nextjs-query-cache';

// Invalidar todas las entradas con esta etiqueta
await invalidateByTag('items');
```

### Invalidar por prefijo

```typescript
import { invalidateCacheByPrefix } from 'nextjs-query-cache';

// Invalidar todas las entradas que comienzan con este prefijo
await invalidateCacheByPrefix('user:');
```

### Limpiar toda la caché

```typescript
import { clearCache } from 'nextjs-query-cache';

// Eliminar todas las entradas de la caché
await clearCache();
```

## API avanzada

### Actualización personalizada de la caché

```typescript
import { updateCache, Cache } from 'nextjs-query-cache';

// Actualizar la caché con una función personalizada
await updateCache((cache: Cache): Cache => {
  // Crear una copia de los items
  const items = { ...cache.items };
  
  // Actualizar los elementos que cumplan cierta condición
  Object.keys(items).forEach(key => {
    if (key.startsWith('user:') && items[key].data.role === 'admin') {
      items[key] = {
        ...items[key],
        data: {
          ...items[key].data,
          permissions: ['read', 'write', 'admin']
        }
      };
    }
  });
  
  // Devolver la nueva estructura de caché
  return { items, tags: cache.tags };
});
```

### Acceso directo a la caché

```typescript
import { getCache, hasCache, setCache } from 'nextjs-query-cache';

// Verificar si una clave existe
const exists = await hasCache('mi-clave');

// Obtener un valor
const value = await getCache('mi-clave');

// Establecer un valor manualmente
await setCache('mi-clave', { data: 'valor' }, ['tag1', 'tag2']);
```

### Monitoreo de la caché

```typescript
import { getAllCacheKeys, getAllCacheTags } from 'nextjs-query-cache';

// Obtener todas las claves
const keys = await getAllCacheKeys();

// Obtener todos los tags
const tags = await getAllCacheTags();

console.log(`La caché contiene ${keys.length} elementos y ${tags.length} tags.`);
```

## Ejemplo completo

```typescript
import { withCache, invalidateByTag } from 'nextjs-query-cache';

// Función costosa que obtiene datos de usuario
const fetchUserData = async (userId: string) => {
  console.log(`[DB] Fetching user: ${userId}`);
  await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia
  return { id: userId, name: `Usuario ${userId}`, role: 'user' };
};

// Versión cacheada
const getUserData = withCache(fetchUserData)({
  minutes: 10,
  cacheKeyPrefix: 'user',
  tags: ['users', `user-${userId}`]
});

// Función para actualizar usuario que también invalida la caché
export async function updateUser(userId: string, data: any) {
  // Actualizar en base de datos
  await db.updateUser(userId, data);
  
  // Invalidar solo la caché de este usuario específico
  await invalidateByTag(`user-${userId}`);
  
  return { success: true };
}

// Uso en una ruta API
export async function GET(request: Request) {
  const userId = new URL(request.url).searchParams.get('id') || '';
  
  try {
    const userData = await getUserData(userId);
    return Response.json(userData);
  } catch (error) {
    return Response.json({ error: 'Error al obtener datos de usuario' }, { status: 500 });
  }
}
```

## Consideraciones

- Esta implementación utiliza una caché en memoria, por lo que se perderá al reiniciar el servidor.
- Es ideal para datos que se actualizan con poca frecuencia pero se acceden constantemente.
- Considera implementar limpieza automática para evitar crecimiento excesivo de la memoria.

## Licencia

MIT 