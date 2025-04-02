# Documentación del Paquete `hegel`

## 1. Propósito y Rol Central

El paquete `hegel` es la **librería base fundamental** dentro del monorepo de Escohotado Portal. Su propósito principal es **centralizar y proporcionar utilidades, tipos y funciones comunes** que son reutilizados a lo largo de múltiples paquetes y aplicaciones (`server`, `web` y otros paquetes en `packages/`).

Actúa como el corazón de la reutilización de bajo nivel, asegurando:

- **Consistencia**: Garantiza que la lógica y los tipos comunes se definan una sola vez.
- **DRY (Don't Repeat Yourself)**: Evita la duplicación de código utilitario.
- **Mantenibilidad**: Simplifica las actualizaciones de lógica común, ya que solo necesitan realizarse en un lugar.
- **Claridad**: Proporciona un lugar designado para encontrar las abstracciones y utilidades fundamentales del sistema.

## 2. Estructura Interna

El código fuente de `hegel` se organiza principalmente dentro del directorio `src/`, con subdirectorios que agrupan funcionalidades por dominio o contexto:

- **`src/domain/`**: Contiene tipos y utilidades relacionados con la lógica de negocio o conceptos generales del dominio, independientes de cualquier framework específico (como React o Payload).
  - _Ejemplos probables (basado en nombres)_: Tipos base de entidades, funciones de validación, utilidades de manejo de datos genéricos.
- **`src/react/`**: Alberga hooks personalizados, componentes utilitarios o funciones helper específicas para ser usadas en entornos React (principalmente en `apps/web` y la UI de los paquetes).
  - _Ejemplos (basado en análisis previo)_: `classMerge` (para combinar clases de Tailwind/CSS), `createTypography` (factoría para componentes de tipografía), `DependencyInjector` (tipo para inyección de dependencias en React).
- **`src/index.ts`**: Es el punto de entrada principal del paquete, exportando públicamente las funcionalidades de los subdirectorios para que puedan ser importadas por otros paquetes/apps.

## 3. Funcionalidades Clave y Ejemplos

Aunque se necesita un análisis más detallado del código fuente específico, algunas funcionalidades clave identificadas o inferidas son:

- **Utilidades de Tipos (TypeScript)**:
  - Tipos genéricos (`Maybe`, `NotNull`, `Result`, etc.).
  - Tipos base para entidades comunes (quizás `BaseUser`, `Timestamped`).
  - Tipos para patrones específicos como `DependencyInjector`.
- **Utilidades de React**:
  - `classMerge`/`classNames`: Funciones para manejar condicionalmente clases CSS, esencial al usar Tailwind CSS.
  - `createTypography`: Una factoría para generar componentes de tipografía estandarizados, promoviendo la consistencia visual.
  - Posibles hooks utilitarios (ej., `useWindowSize`, `useDebounce`).
- **Helpers Generales**:
  - Funciones para manipulación de strings, fechas, números.
  - Validadores o type guards.
  - `notNull`: Una utilidad para asegurar que un valor no es nulo o indefinido (vista en el código).

```typescript
// Ejemplo de posible uso (conceptual)
import { Maybe, notNull, classMerge } from 'hegel';
import { createTypography } from 'hegel/react';

const Title = createTypography('h1', 'font-bold text-2xl');

interface UserProfileProps {
  user: Maybe<User>; // Tipo Maybe<T> probablemente de hegel
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const validUser = notNull(user); // Uso de notNull de hegel

  if (!validUser) {
    return <p>Usuario no encontrado.</p>;
  }

  const containerClasses = classMerge(
    'p-4 rounded-md',
    validUser.isActive ? 'bg-green-100' : 'bg-gray-100'
  ); // Uso de classMerge de hegel/react

  return (
    <div className={containerClasses}>
      <Title>{validUser.name}</Title>
      {/* ... más detalles ... */}
    </div>
  );
};
```

## 4. Importancia Estratégica

La existencia de `hegel` subraya el objetivo de construir una base de código **modular y reutilizable**. Es fundamental para:

- **Escalar el Desarrollo**: Facilita la adición de nuevas funcionalidades o incluso nuevos proyectos basados en la misma infraestructura.
- **Mantener la Calidad**: Al centralizar el código común, se reduce la superficie para errores y se facilita la aplicación de mejoras o correcciones de forma global.
- **Onboarding de Desarrolladores**: Proporciona un punto de partida claro para entender las convenciones y utilidades básicas del proyecto.

## 5. Consideraciones y Mantenimiento

- **Claridad en la Exportación**: Es vital que `src/index.ts` exporte solo lo que se pretende que sea público, manteniendo una API clara y estable para el paquete.
- **Evitar el Sobre-Acoplamiento**: Aunque `hegel` es la base, debe evitarse que dependa de otros paquetes específicos (excepto quizás dependencias de desarrollo). Su rol es ser una dependencia, no un dependiente (más allá de librerías externas como React).
- **Documentación (TSDoc)**: Documentar las funciones y tipos exportados usando TSDoc es crucial para facilitar su uso correcto en el resto del monorepo.
- **Pruebas Unitarias**: Dada su criticidad, las utilidades en `hegel` deben tener una alta cobertura de pruebas unitarias.
