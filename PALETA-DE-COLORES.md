# Paleta de Colores - MIA Massage & Wellness

## 🎨 Paleta de Colores Aplicada

Esta es la nueva paleta de colores basada en el logo de MIA Massage & Wellness, implementada en todo el sitio web.

### Colores del Logo (Base)

| Color | Hex Code | Uso |
|-------|----------|-----|
| **Coral Rosado** | `#E8B4A8` | Pétalos de loto - Botones primarios, acentos principales |
| **Verde Salvia** | `#A8C5BE` | Manos - Botones secundarios, elementos destacados |

### Fondo y Espacios Neutros

| Color | Hex Code | Uso |
|-------|----------|-----|
| **Beige Arena** | `#F5F0EB` | Fondos principales, secciones |
| **Blanco Cálido** | `#FDFBF9` | Fondos de tarjetas, espacios alternos |
| **Gris Perla** | `#E8E4DF` | Secciones alternas, elementos secundarios |

### Acentos y Elementos Interactivos

| Color | Hex Code | Uso |
|-------|----------|-----|
| **Terracota Suave** | `#D4998D` | Hover de botones primarios |
| **Verde Menta Pálido** | `#C7DED9` | Hover de botones secundarios |
| **Lavanda Pastel** | `#E5D9E8` | Detalles decorativos, hover de elementos |

### Tipografía

| Color | Hex Code | Uso |
|-------|----------|-----|
| **Texto Principal** | `#5A5552` | Gris cálido oscuro - Títulos y texto principal |
| **Texto Secundario** | `#8B8380` | Gris medio - Subtítulos y texto secundario |

## 📋 Variables CSS

Todas las variables están definidas en `src/styles/global.css`:

```css
:root {
  /* Colores del Logo (Base) */
  --coral-rosado: #E8B4A8;      /* Pétalos de loto */
  --verde-salvia: #A8C5BE;      /* Manos */
  
  /* Fondo y espacios neutros */
  --beige-arena: #F5F0EB;       /* Fondos principales */
  --blanco-calido: #FDFBF9;     /* Fondos alternos */
  --gris-perla: #E8E4DF;        /* Secciones alternas */
  
  /* Acentos y elementos interactivos */
  --terracota-suave: #D4998D;   /* Hover de botones primarios */
  --verde-menta: #C7DED9;       /* Hover de botones secundarios */
  --lavanda-pastel: #E5D9E8;    /* Detalles decorativos */
  
  /* Tipografía */
  --texto-principal: #5A5552;   /* Gris cálido oscuro */
  --texto-secundario: #8B8380;  /* Gris medio */
}
```

## 🎯 Aplicación Estratégica

### Hero/Headers
- **Fondo:** Beige arena (`--beige-arena`)
- **Tipografía:** Gris cálido (`--texto-principal`)

### Botones Primarios
- **Normal:** Coral rosado (`--coral-rosado`)
- **Hover:** Terracota suave (`--terracota-suave`)
- **Sombra:** `rgba(232, 180, 168, 0.2)` → `rgba(212, 153, 141, 0.4)` en hover

### Botones Secundarios
- **Normal:** Verde salvia (`--verde-salvia`)
- **Hover:** Verde menta (`--verde-menta`)
- **Sombra:** `rgba(168, 197, 190, 0.2)` → `rgba(199, 222, 217, 0.4)` en hover

### Secciones Alternas
- **Opción 1:** Blanco cálido (`--blanco-calido`)
- **Opción 2:** Gris perla (`--gris-perla`)

### Elementos Decorativos
- **Detalles sutiles:** Lavanda pastel (`--lavanda-pastel`)
- **Bullets/Viñetas:** Coral rosado (`--coral-rosado`)

## ✅ Archivos Actualizados

### Estilos Globales
- ✅ `src/styles/global.css` - Variables CSS y estilos de botones

### Páginas
- ✅ `src/pages/index.astro` - Página principal
- ✅ `src/pages/discover.astro` - Página de servicios
- ✅ `src/pages/contact.astro` - Página de contacto
- ✅ `src/pages/gallery.astro` - Galería de imágenes
- ✅ `src/pages/cart.astro` - Carrito de compras

### Componentes
- ✅ `src/components/Header.astro` - Encabezado
- ✅ `src/components/Footer.astro` - Pie de página
- ✅ `src/components/ServiceCard.astro` - Tarjetas de servicios
- ✅ `src/components/CartItem.astro` - Items del carrito

## 🎨 Beneficios de la Paleta

1. **Coherencia Visual**: Todos los elementos siguen la misma paleta del logo
2. **Ambiente Relajante**: Colores suaves y cálidos ideales para wellness
3. **Profesionalismo**: Paleta sofisticada y armoniosa
4. **Accesibilidad**: Contraste adecuado para legibilidad
5. **Identidad de Marca**: Refuerza la identidad visual de MIA Massage & Wellness

## 📝 Notas

- Los colores rojos (#ff4444) para botones destructivos (eliminar) se mantuvieron por convención UX
- Todos los gradientes ahora usan las variables de la paleta
- Las sombras utilizan versiones rgba de los colores principales para mejor integración

