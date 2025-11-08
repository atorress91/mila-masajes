# MIA Massage & Wellness - Astro + Sanity CMS + Cal.com

## 🚀 Proyecto Astro con CMS Headless y Sistema de Reservas

Este es el proyecto MIA Massage & Wellness construido con **Astro** (frontend), **Sanity CMS** (gestión de contenido) y **Cal.com** (sistema de reservas) para máximo rendimiento y flexibilidad.

## ⚡ Características

- ⚡ **Astro** - Framework ultra rápido con HTML estático
- 🎨 **Sanity CMS** - Gestión de contenido sin código
- 📅 **Cal.com** - Sistema de reservas integrado con Google Calendar
- 🎭 **View Transitions** - Transiciones suaves entre páginas
- 🔄 **Page Loader** - Loading elegante con animaciones
- 📱 **Responsive** - Diseño adaptable a todos los dispositivos
- 🎯 **SEO Optimizado** - Meta tags y Open Graph configurados
- 🖼️ **Imágenes Optimizadas** - CDN de Sanity con WebP automático

## 📦 Instalación Rápida

```bash
cd masajes-astro
npm install
```

## 🔧 Configuración Requerida

### 1. Configurar Sanity CMS

**Lee la documentación completa:** [`SANITY_SETUP.md`](SANITY_SETUP.md)

```bash
# 1. Navegar a carpeta Sanity
cd sanity

# 2. Inicializar proyecto Sanity
npx sanity init

# 3. Instalar dependencias
npm install

# 4. Iniciar Sanity Studio
npm run dev
# → Abre http://localhost:3333
```

### 2. Configurar Cal.com para Reservas

**Lee la documentación completa:** [`CAL-COM-SETUP.md`](CAL-COM-SETUP.md)

**Resumen rápido:**

1. Crea cuenta en [Cal.com](https://cal.com/signup)
2. Crea UN evento llamado "Masajes" con slug `masajes`
3. Conecta tu Google Calendar
4. Actualiza tu username en `src/pages/booking.astro`:
   ```typescript
   const calUsername = 'tu-usuario'; // ← Cambiar por tu username
   ```

## 🛠️ Comandos Disponibles

### Astro (Frontend)

| Comando           | Acción                                               |
| :---------------- | :--------------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo en `localhost:4322` |
| `npm run build`   | Construye el sitio para producción en `./dist/`      |
| `npm run preview` | Vista previa del build antes de deployar             |

### Sanity (CMS)

| Comando                    | Acción                                    |
| :------------------------- | :---------------------------------------- |
| `.\start-sanity.ps1`       | Inicia Sanity Studio (Windows PowerShell) |
| `cd sanity && npm run dev` | Inicia Sanity Studio manualmente          |
| `npm run deploy`           | Despliega Sanity Studio a la nube         |

## 🚀 Desarrollo

**Terminal 1 - Astro:**

```bash
npm run dev
# → http://localhost:4322
```

**Terminal 2 - Sanity Studio:**

```bash
.\start-sanity.ps1
# → http://localhost:3333
```

## 📁 Estructura del Proyecto

```
masajes-astro/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── PageLoader.astro
│   │   └── ServiceCard.astro
│   ├── layouts/           # Layouts base
│   │   └── Layout.astro
│   ├── pages/             # Páginas del sitio
│   │   ├── index.astro
│   │   ├── discover.astro
│   │   ├── gallery.astro
│   │   └── contact.astro
│   ├── lib/               # Utilidades y conexiones
│   │   └── sanity.ts      # 🆕 Cliente de Sanity
│   ├── data/              # Datos locales
│   │   └── services.ts
│   └── styles/            # Estilos globales
│       ├── global.css
│       └── transitions.css # 🆕 Animaciones
├── sanity/                # 🆕 Sanity CMS
│   ├── schemas/           # Schemas de contenido
│   │   ├── service.js
│   │   ├── benefit.js
│   │   ├── pageContent.js
│   │   └── testimonial.js
│   ├── sanity.config.js
│   └── package.json
├── public/                # Assets estáticos
├── .env                   # 🆕 Variables de entorno
├── astro.config.mjs
├── SANITY_SETUP.md        # 🆕 Guía de configuración
└── start-sanity.ps1       # 🆕 Script de inicio
```

## ✅ Progreso de Migración

### Completado:

- ✅ Estructura base del proyecto Astro
- ✅ Configuración (package.json, astro.config.mjs, tsconfig.json)
- ✅ Estilos globales y variables CSS
- ✅ Layout base
- ✅ Datos de servicios (TypeScript interfaces y data)
- ✅ Componente ServiceCard (con animaciones y quick view)
- ✅ Componente ServiceModal (modal completo con add-ons)
- ✅ Página Index (landing page)
- ✅ Página Discover (filtros, búsqueda, grid de servicios)
- ✅ Página Cart (carrito con checkout)
- ✅ Página Contact (formulario de contacto)
- ✅ Página Gallery (galería con lightbox y filtros)
- ✅ Componente Header (con carrito funcional)
- ✅ Componente Footer

### Pendiente:

- ⏳ Store para manejo del carrito (Nanostores - opcional)
- ⏳ Migrar assets (imágenes desde proyecto original)

## 🎨 Características

- **Astro Islands**: JavaScript solo donde se necesita
- **TypeScript**: Para mejor DX y type safety
- **Componentes modulares**: Header, Footer reutilizables
- **Estilos con scope**: CSS aislado por componente
- **Performance**: HTML estático por defecto
- **Cart Management**: LocalStorage con Nanostores

## 📝 Próximos Pasos

1. Copiar assets desde `../assets/` a `public/assets/`
2. Crear componentes de servicio
3. Migrar páginas restantes
4. Implementar store del carrito con Nanostores
5. Agregar modal de servicio interactivo

## 🌟 Beneficios vs HTML Vanilla

- ⚡ Mejor performance (HTML estático)
- 🔧 Componentes reutilizables
- 🎯 TypeScript integrado
- 📦 Builds optimizados
- 🔄 Hot reload instantáneo
- 🎨 Scoped CSS automático
