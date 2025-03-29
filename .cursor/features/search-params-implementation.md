# Implementación de Parámetros de Búsqueda

## Arquitectura y Flujo de Datos

### Capas de la Aplicación

1. **Capa de Servidor (Server Layer)**
   - Responsable de obtener datos de Payload CMS
   - Maneja la lógica de negocio y transformación de datos
   - Proporciona datos iniciales a los componentes cliente

2. **Capa de Cliente (Client Layer)**
   - Maneja la interacción del usuario
   - Gestiona el estado de la URL usano nuqs
   - Renderiza componentes interactivos

### ¿Porque NUQS?

Ofrece una gestión muy funcional de los query params. Muy fácil de extraerlos y ofrece una buena integración con NextJS lo que nos evita tener que controlar un soft change (sin provocar un refresco) o un hard change (que redirije y abre de nuevo la URL).

### Flujo de Datos

```mermaid
graph TD
    A[Server Component] -->|Datos Iniciales| B[Client Component]
    B -->|nuqs useQueryParams| C[URL State]
    C -->|Actualización| B
    D[Payload CMS] -->|Tags| A
```

### Tipos de Datos

1. **Datos Dinámicos (Server)**
   - Tags de contenido
   - Categorías
   - Otros datos de Payload CMS

2. **Datos Estáticos (Client)**
   - Opciones de ordenamiento (sort)
   - Playlists predefinidas (por el momento)
   - Configuraciones de UI

## Implementación Actual

### Server Components

```typescript
// Ejemplo de Server Component
export default async function Page() {
  const tags = await tagsFromContentQueryWithCache('article_web', '', ['autor', 'revisar'])
  
  return (
    <ClientComponent initialTags={tags} />
  )
}
```

### Client Components

```typescript
'use client'
export function ClientComponent({ initialTags }) {
  const { setQueryParams, getQueryParams } = useQueryParams()
  
  return (
    <SelectDropdown
      tags={initialTags}
      // ... resto de props
    />
  )
}
```

## Tareas Pendientes

### 1. Storybook Integration
- Adaptar componentes para Storybook
- Crear stories que simulen diferentes estados
- Documentar props y comportamientos

### 2. Mejoras Futuras

#### Sistema de Slugs de las playlist
- Implementar sistema para obtener slugs de Payload CMS
- Crear colección específica para playlists de YouTube
- Migrar playlists hardcodeadas a datos dinámicos


### 3. Optimizaciones
- Mejorar rendimiento de actualizaciones de URL
- Añadir validación de datos

## Consideraciones de Diseño

### 1. Separación de Responsabilidades
- Server: Obtención y transformación de datos
- Client: Interacción y estado de UI
- URL: Estado global de la aplicación

### 2. Tipado y Validación
- Interfaces claras entre capas
- Validación de datos en cada nivel
- Manejo de errores consistente
