# Escohotado Web - Documentación

## Estructura del Monorepo

Este proyecto está estructurado como un monorepo que facilita el desarrollo y mantenimiento de diferentes paquetes y aplicaciones relacionadas. La estructura principal es la siguiente:

```
Escohotado-WEB/
├── apps/
│   └── server/       # Aplicación principal con NextJS y PayloadCMS
├── packages/
│   ├── gaudi/        # Componentes UI y lógica de presentación
│   ├── hegel/        # Configuración de rutas y constantes globales
│   ├── eslint-config/  # Configuración compartida de ESLint
│   └── config/       # Configuraciones compartidas
```

Este enfoque de monorepo nos permite:
- Compartir código entre diferentes partes del proyecto
- Mantener una gestión centralizada de dependencias
- Facilitar el desarrollo y pruebas integradas
- Aplicar cambios de manera consistente en todo el ecosistema

## Tecnologías Principales

### NextJS

El proyecto utiliza NextJS como framework principal de React para:
- Renderizado del lado del servidor (SSR)
- Generación estática (SSG)
- Enrutamiento eficiente
- Optimización de imágenes y recursos
- API routes para backend

### PayloadCMS

PayloadCMS es nuestro CMS headless que:
- Proporciona una interfaz administrativa robusta
- Permite definir colecciones y relaciones
- Ofrece autenticación y control de acceso
- Facilita la gestión de contenido multilingüe
- Se integra perfectamente con NextJS

## Conexión con AuthJS

La autenticación se maneja a través de AuthJS (anteriormente NextAuth.js), proporcionando:

- Integración con Keycloak como proveedor principal de identidad
- Estrategia de sesión basada en base de datos
- Autenticación segura y gestión de sesiones
- Integración con PayloadCMS para la gestión de usuarios
- Sincronización de roles y permisos

El flujo de autenticación funciona de la siguiente manera:
1. El usuario inicia el proceso de login
2. Se redirige a Keycloak para autenticación
3. Keycloak devuelve el perfil y tokens
4. AuthJS sincroniza los datos con PayloadCMS
5. Se crea una sesión para el usuario autenticado

## Colecciones en PayloadCMS

El sistema incluye las siguientes colecciones principales:

### Usuarios y Autenticación
- **users**: Gestión de usuarios con roles y permisos
- **permissions**: Control granular de acceso

### Contenido
- **content**: Colecciones para diferentes tipos de contenido como artículos, páginas, etc.
- **taxonomy**: Sistema de categorización y etiquetado
- **media**: Gestión centralizada de recursos multimedia

### Comercio
- **products**: Catálogo de productos digitales y físicos
- **prices**: Precios asociados a los productos
- **subscriptions**: Gestión de suscripciones de usuarios

### UI
- **ui**: Elementos configurables de la interfaz de usuario

Cada colección está diseñada para ser extensible y permitir relaciones complejas entre entidades.

## Bloques Lexical para Contenido Modular

El proyecto utiliza el editor Lexical (desarrollado por Meta) como alternativa a SlateJS para:

- Crear bloques de contenido reutilizables
- Permitir la composición modular de páginas
- Facilitar la creación de contenido rico y estructurado

Los bloques principales incluyen:
- Texto enriquecido con formato avanzado
- Galerías de imágenes
- Incrustaciones de vídeo
- Componentes de llamada a la acción
- Secciones personalizables
- Bloques de código y sintaxis

El sistema está diseñado para que los editores puedan:
1. Seleccionar tipos de bloques para insertar
2. Configurar propiedades específicas de cada bloque
3. Ordenar y anidar bloques según necesidades
4. Previsualizar el contenido antes de publicar

## Integración con Servicios Externos

### Foro
El proyecto se integra con un foro externo para la comunidad mediante:
- API de autenticación compartida
- Sincronización de usuarios y perfiles
- Sistema de notificaciones cruzadas
- Embebido de contenido del foro en el sitio principal

### Servicios de Correo
La plataforma se conecta con servicios externos de correo para:
- Envío de newsletters personalizadas
- Notificaciones automáticas a usuarios
- Campañas específicas según segmentación
- Seguimiento de métricas de comunicación

### Pasarelas de Pago
Integración con:
- Stripe para suscripciones y pagos recurrentes
- Procesamiento seguro de transacciones
- Gestión de facturas y registros fiscales

## Despliegue y Operaciones

El proyecto está configurado para:
- Despliegue en contenedores Docker
- Implementación en Kubernetes
- Integración continua y despliegue continuo (CI/CD)
- Monitorización con Sentry para errores y rendimiento

## Desarrollo

### Requisitos Previos
- Node.js 18+
- PNPM como gestor de paquetes
- PostgreSQL para la base de datos

### Configuración Inicial
```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.dist .env
# Editar .env con los valores adecuados

# Iniciar entorno de desarrollo
pnpm dev
```

### Comandos Principales
- `pnpm dev`: Inicia el entorno de desarrollo
- `pnpm build`: Construye el proyecto para producción
- `pnpm lint`: Verifica problemas de código
- `pnpm test`: Ejecuta pruebas

## Contribución

Para contribuir al proyecto:
1. Crear una rama desde `main`
2. Realizar cambios siguiendo las guías de estilo
3. Enviar un pull request con descripción detallada
4. Esperar la revisión y aprobación

---

Desarrollado con ❤️ para preservar y difundir el legado de Antonio Escohotado.
