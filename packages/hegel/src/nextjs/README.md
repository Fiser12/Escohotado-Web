# nextjs-cache-func

Una solución ligera para cachear resultados de funciones asíncronas en aplicaciones Next.js, especialmente útil para server functions.

## Características

- 🚀 **Simple y efectiva**: Implementación ligera, fácil de entender y usar
- 🔄 **Caché en memoria**: Perfecta para mejorar el rendimiento de operaciones costosas
- 🔧 **Configuración sencilla**: Control de duración de la caché con opciones intuitivas
- 📝 **Tipado completo**: Soporte completo para TypeScript

## Instalación

```bash
npm install nextjs-cache-func
```

## Uso básico

```typescript
import { withCache } from 'hegel';

// Función que quieres cachear (server-side)
async function fetchExpensiveData(id: string) {
  // ... operación costosa ...
  return data;
}

// Crear una versión cacheada de la función
const fetchExpensiveDataWithCache = withCache(fetchExpensiveData);

// Usar la función cacheada (con caché de 5 minutos)
const data = await fetchExpensiveDataWithCache({ minutes: 5 }, 'my-id');
```

## Opciones de caché

```typescript
interface CacheOptions {
  // Duración del caché (solo se utiliza uno)
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  
  // Personalización de la clave
  cacheKeyPrefix?: string;
}
```

## Operaciones de caché manuales

Además de la función `withCache`, puedes usar estas funciones para manipular la caché directamente:

```typescript
import { setCache, getCache, invalidateCache, clearCache } from 'hegel';

// Guardar en caché manualmente
await setCache('mi-clave', miDato);

// Obtener de la caché
const dato = await getCache('mi-clave');

// Invalidar una entrada específica
await invalidateCache('mi-clave');

// Invalidar todas las entradas que comienzan con un prefijo
await invalidateCacheByPrefix('user:');

// Limpiar toda la caché
await clearCache();
```

## Buenas prácticas

1. **Utiliza para operaciones costosas**: Consultas a bases de datos, llamadas a APIs externas, etc.
2. **Configura la duración adecuada**: Equilibra la frescura de los datos con el rendimiento
3. **Usa prefijos significativos**: Facilita la identificación e invalidación de grupos de datos

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## Licencia

MIT 