# Propuesta de Unificación: `payload-stripe-permissions`

## 1. Introducción y Propósito

Esta propuesta describe la unificación de los paquetes existentes `payload-stripe-inventory` y `payload-access-control` en un nuevo paquete único llamado `payload-stripe-permissions`. El objetivo es crear una solución cohesiva y centralizada que gestione tanto la integración con Stripe (productos, precios, suscripciones, webhooks) como el control de acceso basado en roles y el estado de dichas suscripciones dentro de Payload CMS.

## 2. Motivación y Justificación

La separación actual, aunque modular, introduce cierta indirección:

- `payload-stripe-inventory` gestiona el estado de la suscripción (datos de Stripe).
- `payload-access-control` consume este estado (probablemente leyendo campos actualizados en la colección `User` u otra) para tomar decisiones de acceso.

Unificar estos paquetes ofrece varias ventajas:

- **Integración Más Estrecha**: La lógica de permisos puede acceder directamente y de forma más fiable al estado de la suscripción gestionado internamente, eliminando posibles puntos de fallo o desincronización.
- **Simplificación del Flujo de Datos**: Se reduce la necesidad de que un paquete actualice datos que el otro simplemente lee. El nuevo paquete sería la única fuente de verdad para el estado de la suscripción y su impacto en los permisos.
- **Configuración Unificada**: Simplifica la configuración en `payload.config.ts`, requiriendo la importación y configuración de un solo plugin en lugar de dos.
- **Mantenibilidad Mejorada**: Reduce la superficie de código a mantener y entender. Las funcionalidades relacionadas lógicamente residen juntas.
- **API Más Cohesiva**: Permite diseñar una API interna y externa (funciones de acceso, hooks, componentes) más coherente y centrada en el concepto de "acceso basado en suscripción".

## 3. Alcance y Funcionalidades Clave del Nuevo Paquete

`payload-stripe-permissions` heredará y combinará las responsabilidades de ambos paquetes originales:

1.  **Gestión de Inventario Stripe**:
    - Sincronización de Productos y Precios desde Stripe a colecciones dedicadas en Payload.
    - Generación de endpoints/funciones para iniciar sesiones de Stripe Checkout.
    - Generación de endpoints/funciones para redirigir al Portal del Cliente de Stripe.
2.  **Gestión de Suscripciones y Webhooks Stripe**:
    - Endpoint para recibir y procesar webhooks de Stripe (creación, actualización, cancelación de suscripciones, etc.).
    - Actualización del estado de la suscripción del usuario en Payload (probablemente en la colección `Users` o una colección `Subscriptions` vinculada).
    - Manejo de lógica de negocio asociada a eventos de suscripción (ej. reactivaciones, cancelaciones al final del periodo).
3.  **Definición de Reglas de Acceso**:
    - Proporcionar mecanismos para definir permisos basados en roles de Payload.
    - Proporcionar mecanismos para definir permisos basados en el estado de la suscripción activa (ej. acceso a contenido si `user.subscription.status === 'active'` y `user.subscription.plan === 'premium'`).
    - Posiblemente, mantener el concepto de `permissions_seeds` si sigue siendo útil.
4.  **Evaluación de Permisos**:
    - Ofrecer funciones de `access` listas para usar en las definiciones de colecciones y campos de Payload CMS.
    - Estas funciones evaluarán tanto los roles como el estado de la suscripción (obtenido directamente de los datos gestionados por el propio paquete).
5.  **Componentes/Utilidades UI (Opcional, pero probable)**:
    - Mantener o adaptar componentes como `ContentProtected` que simplifiquen la ocultación/muestra de contenido en el frontend basándose en los permisos evaluados.

## 4. Arquitectura Propuesta (Alto Nivel)

Dentro de `payload-stripe-permissions`:

- **Modularidad Interna**: Mantener subdirectorios para organizar la lógica (ej. `src/stripe`, `src/permissions`, `src/webhooks`, `src/access`, `src/ui`).
- **Configuración Unificada**: El plugin aceptará un único objeto de configuración que combine las opciones necesarias para Stripe (API keys, IDs de productos/precios relevantes, URLs de redirección) y para el control de acceso (mapeo de roles, lógica de permisos por defecto).
- **Estado Centralizado**: El paquete gestionará internamente cómo y dónde se almacena el estado relevante de la suscripción del usuario (ej. campos específicos en la colección `Users` o una colección dedicada `Subscriptions`).
- **API de Acceso Simplificada**: Las funciones de `access` importadas desde este paquete (`import { canReadPremiumContent } from 'payload-stripe-permissions/access';`) encapsularán la lógica combinada de rol + suscripción.

```typescript
// payload.config.ts (Conceptual)
import { buildConfig } from "payload/config";
import { payloadStripePermissions } from "payload-stripe-permissions"; // Nuevo paquete
// ... otras imports

export default buildConfig({
  // ...
  plugins: [
    payloadStripePermissions({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      // ... otras config de Stripe (portal, checkout)
      permissionRules: {
        // Define cómo se relacionan roles y suscripciones con el acceso
        canAccessVideos: ({ user }) =>
          user.roles.includes("admin") ||
          user.subscription?.plan === "video_pass",
        canAccessArticles: ({ user }) =>
          user.roles.includes("admin") ||
          user.subscription?.status === "active",
      },
      // Mapeo a colecciones (opcional, si se necesita)
      syncProductsToCollection: "stripe-products",
      userCollection: "users",
      // ...
    }),
    // ... otros plugins
  ],
  collections: [
    Users, // Asegurarse que Users tiene los campos necesarios
    Articles,
    Videos,
    // ... otras colecciones
  ],
  // ...
});

// collections/Articles.ts (Conceptual)
import type { CollectionConfig } from "payload/types";
import { permissions } from "payload-stripe-permissions/access"; // Funciones de acceso del nuevo paquete

export const Articles: CollectionConfig = {
  slug: "articles",
  access: {
    read: permissions.canAccessArticles, // Usa la función de acceso combinada
    // ... create, update, delete
  },
  fields: [
    // ...
  ],
};
```

## 5. Pasos de Migración Sugeridos

1.  **Crear Nuevo Paquete**: Crear la estructura del directorio `packages/payload-stripe-permissions`.
2.  **Mover Código**: Migrar gradualmente el código fuente de `payload-stripe-inventory` y `payload-access-control` a los subdirectorios apropiados dentro del nuevo paquete.
3.  **Refactorizar y Unificar**:
    - Identificar y eliminar redundancias.
    - Ajustar la lógica de permisos para que consuma directamente el estado de suscripción gestionado internamente.
    - Unificar la configuración del plugin.
    - Adaptar los puntos de entrada y exportaciones.
4.  **Actualizar Dependencias**: Modificar los `package.json` de `apps/server` y otros paquetes que dependieran de los paquetes antiguos para que ahora dependan de `payload-stripe-permissions`.
5.  **Actualizar `payload.config.ts`**: Reemplazar la configuración de los dos plugins antiguos por la del nuevo plugin unificado.
6.  **Actualizar Uso de Funciones de Acceso**: Modificar las definiciones de colecciones (`access` functions) para importar y usar las nuevas funciones de acceso proporcionadas por `payload-stripe-permissions`.
7.  **Pruebas Exhaustivas**: Probar rigurosamente todos los flujos: sincronización de Stripe, checkout, portal, procesamiento de webhooks, y todos los escenarios de control de acceso (diferentes roles, con/sin suscripción, suscripciones activas/canceladas).
8.  **Eliminar Paquetes Antiguos**: Una vez verificado que todo funciona correctamente, eliminar los directorios `packages/payload-stripe-inventory` y `packages/payload-access-control` y limpiar referencias en `pnpm-workspace.yaml`.

## 6. Riesgos y Consideraciones

- **Esfuerzo de Refactorización**: La fusión requerirá un esfuerzo significativo de refactorización y pruebas.
- **Introducción de Bugs**: Como en cualquier refactorización mayor, existe el riesgo de introducir errores sutiles, especialmente en la lógica de webhooks y evaluación de permisos.
- **Complejidad Inicial del Nuevo Paquete**: El paquete resultante será más grande y complejo que los originales individualmente, requiriendo una buena organización interna.

## 7. Conclusión

La unificación de `payload-stripe-inventory` y `payload-access-control` en `payload-stripe-permissions` representa una mejora arquitectónica estratégica. Aunque requiere un esfuerzo inicial de migración, los beneficios a largo plazo en términos de simplicidad, mantenibilidad y robustez justifican la inversión, alineándose con el objetivo de crear una base de código limpia y reutilizable.
