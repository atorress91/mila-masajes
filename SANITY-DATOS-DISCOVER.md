# Guía para agregar datos en Sanity para la página Discover

La página `discover.astro` ahora obtiene los servicios y paquetes desde Sanity CMS en lugar de estar hardcodeados.

## Cambios realizados

### 1. Nuevos esquemas creados

#### Schema: `package.js`

Nuevo esquema para gestionar paquetes especiales con los siguientes campos:

- **title**: Título del paquete
- **slug**: URL amigable
- **description**: Descripción breve
- **icon**: Emoji del paquete (ej: 🌸, ✨, 💕)
- **price**: Precio actual
- **originalPrice**: Precio original (antes de descuento)
- **color**: Color de acento en formato hexadecimal (ej: #8b5a5a)
- **featured**: Marcar como "Más Popular"
- **services**: Referencias a servicios incluidos
- **order**: Orden de visualización
- **isActive**: Activar/desactivar paquete

### 2. Campos añadidos al schema `service.js`

Se agregaron dos campos nuevos:

- **color**: Color de acento en formato hexadecimal para las tarjetas de servicio
- **rating**: Calificación del servicio (0-5)

### 3. Funciones añadidas en `sanity.ts`

- `getPackages()`: Obtiene todos los paquetes activos ordenados
- Interface `Package`: Define el tipo TypeScript para paquetes

## Cómo agregar datos en Sanity Studio

### Paso 1: Iniciar Sanity Studio

```powershell
cd sanity
npm run dev
```

Luego abre http://localhost:3333 en tu navegador.

### Paso 2: Agregar Servicios

1. Ve a la sección **Services** en el menú lateral
2. Haz clic en "Create new Service"
3. Completa los campos:
   - **Service Title**: Nombre del servicio (ej: "Masaje Sueco")
   - **Slug**: Se genera automáticamente del título
   - **Description**: Descripción del servicio
   - **Price**: Precio en USD (ej: 85)
   - **Duration**: Duración en minutos (ej: 90)
   - **Image**: Sube una imagen del servicio
   - **Category**: Selecciona una categoría
   - **Color**: Color hexadecimal (ej: #8b5a5a)
   - **Rating**: Calificación 0-5 (ej: 4.9)
   - **Featured**: Marcar si quieres que aparezca en la página principal
   - **Display Order**: Número para ordenar (0, 1, 2, etc.)
4. Haz clic en "Publish"

#### Ejemplo de servicios a crear:

| Title                    | Duration | Price | Color   | Rating | Order |
| ------------------------ | -------- | ----- | ------- | ------ | ----- |
| Masaje Sueco             | 90       | 85    | #8b5a5a | 4.9    | 0     |
| Masaje Tejido Profundo   | 75       | 95    | #5a7a8b | 4.8    | 1     |
| Masaje Piedras Calientes | 105      | 110   | #8b7a5a | 5.0    | 2     |
| Aromaterapia             | 80       | 90    | #7a5a8b | 4.9    | 3     |
| Masaje en Pareja         | 90       | 180   | #8b6b5a | 4.9    | 4     |

### Paso 3: Agregar Paquetes

1. Ve a la sección **Packages** en el menú lateral
2. Haz clic en "Create new Package"
3. Completa los campos:
   - **Package Title**: Nombre del paquete (ej: "Paquete Relajación")
   - **Slug**: Se genera automáticamente
   - **Description**: Descripción breve (ej: "Masaje sueco + aromaterapia + acceso al spa")
   - **Icon**: Emoji único (ej: 🌸)
   - **Current Price**: Precio con descuento (ej: 150)
   - **Original Price**: Precio original (ej: 175)
   - **Accent Color**: Color hexadecimal (ej: #8b5a5a)
   - **Featured Package**: Marcar para mostrar "MÁS POPULAR"
   - **Included Services**: Seleccionar servicios incluidos
   - **Display Order**: Orden de visualización
   - **Active**: Marcar para mostrar en el sitio
4. Haz clic en "Publish"

#### Ejemplo de paquetes a crear:

| Title              | Icon | Price | Original | Color   | Featured | Order |
| ------------------ | ---- | ----- | -------- | ------- | -------- | ----- |
| Paquete Relajación | 🌸   | 150   | 175      | #8b5a5a | No       | 0     |
| Paquete Premium    | ✨   | 220   | 265      | #8b7a5a | Sí       | 1     |
| Paquete Romántico  | 💕   | 250   | 290      | #8b6b5a | No       | 2     |

## Notas importantes

1. **Colores sugeridos** (paleta terracota/tierra):
   - Coral-terracota: `#8b5a5a`
   - Azul-verde: `#5a7a8b`
   - Dorado: `#8b7a5a`
   - Lavanda: `#7a5a8b`
   - Tierra: `#8b6b5a`

2. **Orden de visualización**:
   - Los primeros 3 servicios (order 0-2) se muestran en tarjetas pequeñas
   - Los servicios restantes (order 3+) se muestran en tarjetas anchas

3. **Valores por defecto**:
   - Si no defines un color, se usará `#8b5a5a` por defecto
   - Si no defines un rating, se usará `5.0` por defecto

4. **Slugs**:
   - Los slugs se usan en las URLs de reserva: `/booking?service=nombre-del-slug`
   - Asegúrate de que sean únicos y descriptivos

## Verificación

Después de agregar los datos en Sanity:

1. Guarda y publica todos los documentos
2. Recarga la página `/discover` en tu sitio web
3. Los servicios y paquetes deberían aparecer automáticamente

Si los datos no aparecen:

- Verifica que el servidor de desarrollo de Astro esté corriendo
- Revisa la consola del navegador para errores
- Confirma que los documentos estén publicados en Sanity
