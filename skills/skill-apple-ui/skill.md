---
name: apple-ui
description: Usa esta skill cuando el usuario necesite crear interfaces web o móviles con diseño premium, minimalista, limpio y moderno inspiradas en sistemas de diseño tipo Apple. Incluye: UI components, interfaces minimalistas, diseño limpio, componentes premium, cards suaves, bordes redondeados, sombras sutiles, tipografía limpia, espaciado amplio, mobile-first, microinteracciones.
metadata:
  version: "2.0.0"
  author: "Darwi"
  tags: [ui, design, frontend, apple, minimal, premium, responsive, clean-code]
compatibility: "HTML, CSS, React, Vue, Astro, o cualquier framework de frontend"
---

# Apple UI Skill

Esta skill genera componentes UI con estética Apple y código limpio, detectando automáticamente la tecnología del proyecto.

## Cuándo Usar

- Crear componentes UI desde cero con estética premium
- Rediseñar interfaces existentes con enfoque minimalista
- Necesitar cards, botones, formularios con bordes redondeados y sombras suaves
- Implementar layouts responsivos mobile-first
- Aplicar tipografía limpia con jerarquía visual clara
- Añadir microinteracciones discretas y feedback visual

## Principios de Código Limpio

Siempre aplica estos principios al generar cualquier componente:

- **SRP (Single Responsibility)**: cada componente/función hace una sola cosa
- **DRY**: no dupliques lógica ni estilos; extrae a constantes y helpers
- **KISS**: prioriza la solución más simple que funciona
- **Nombres significativos**: variables, funciones y componentes deben explicarse por sí mismos
- **Componentes pequeños**: máximo ~100 líneas; si crece, divide
- **Props explícitas**: tipa todas las props; evita `any`
- **Side effects separados**: lógica de negocio fuera del render
- **Sin comentarios redundantes**: el código debe ser autodocumentado; usa comentarios solo para explicar el "por qué"
- **Separación de lenguajes**: no mezcles HTML, CSS y JS en un mismo archivo. Cada lenguaje en su propio archivo, a menos que el framework lo requiera explícitamente (Vue SFC, Svelte, Astro).
- **Sin sobrescritura**: antes de crear cualquier archivo, verifica que no exista. Si existe, saltéalo.
- **Estructura contextual**: usa las carpetas que ya tiene el proyecto. Si existe `assets/css/`, pon los estilos ahí.

## Reglas de Contenido

- No hardcodees textos, imagenes ni nombres de producto.
- No menciones marcas ni categorias de producto si el usuario no lo pide.
- Usa placeholders o variables para que el contenido final lo aporte el usuario.
- Sigue la arquitectura del proyecto detectado (componentes, pages, layouts, etc.).

## Paso a Paso

### 0. Consultar referencia visual del diseño

Antes de escribir código, revisa `assets/index.pdf` — contiene el diseño visual de referencia de apple.com/cl.

**Instrucciones:**
1. Lee `assets/index.pdf` al inicio de cada tarea
2. Extrae: estructura de layout, spacing entre bloques, comportamiento responsivo, tamaños de tipografía, colores, imagenes, hover states y microinteracciones
3. Toma el diseño como especificación y tradúcelo a HTML/CSS/JS o el stack detectado
4. No adivines ni improvises — el PDF es la fuente de verdad visual
5. Si el PDF muestra un componente que no está contemplado en los CSS de la skill, agrega los estilos necesarios siguiendo el sistema de tokens (`var(--token)`)

### 1. Detectar tecnología del proyecto

Inspecciona el proyecto para determinar el stack y adaptar la generación:

**Qué revisar (en orden):**
1. `package.json` → `dependencies` y `devDependencies`
2. `tsconfig.json` / `jsconfig.json` → TypeScript o JavaScript
3. Archivos de configuración: `astro.config.mjs`, `next.config.js`, `vite.config.ts`
4. Estructura de carpetas: `src/pages/`, `src/components/`, `src/layouts/`

**Stacks detectables y outputs esperados:**

| Stack | Formato de componentes | Archivos a generar |
|---|---|---|
| React + TSX | `Componente.tsx`, `Componente.module.css` | Componentes con props tipadas (interface/enum) |
| React + JSX | `Componente.jsx`, `Componente.module.css` | Componentes funcionales con PropTypes |
| React Native + TS | `Componente.tsx` con StyleSheet | Componentes cross-platform con styled components |
| Vue 3 + TS | `Componente.vue` (Composition API + `<script setup>`) | SFC con `<script setup lang="ts">` |
| Vue 3 + JS | `Componente.vue` (Composition API) | SFC con `<script setup>` |
| Astro | `Componente.astro` (si es estático) o `Componente.tsx` (si es interactivo) | Componentes .astro con fragment de HTML y frontmatter |
| Next.js App Router | `components/Comp.tsx`, `app/_components/` | Componentes con 'use client' solo si hay interactividad |
| Next.js Pages Router | `components/Comp.tsx` | Componentes sin 'use client' |
| SvelteKit | `Componente.svelte` | Componentes Svelte con script/style |
| Vanilla HTML/CSS/JS | `componente.html`, `componente.css`, `componente.js` | HTML semántico + CSS nativo + JS vanilla |
| Angular + TS | `componente.component.ts`, `componente.component.html`, `componente.component.css` | Componentes Angular standalone |

**Archivos a generar según el stack:**
- **React/Next/Vue/Astro/Svelte**: genera un archivo por componente siguiendo la convención del framework
- **Vanilla**: separa HTML + CSS + JS (un archivo por preocupación)
- **CSS Modules**: preferidos sobre CSS global cuando el stack lo soporte
- **Tailwind**: si detectas `tailwind.config`, usa clases Tailwind en lugar de CSS modules

**Si no puedes determinar el stack:**
- Pregunta al usuario: "¿En qué tecnología necesitas los componentes? (React, Vue, Astro, HTML vanilla, etc.)"
- Por defecto, genera HTML + CSS vanilla con diseño responsivo

### 2. Inspeccionar estructura de archivos existente

Antes de crear cualquier archivo, revisa qué carpetas ya existen en el proyecto:

**Qué revisar:**
1. Si existe `components/` o `src/components/` — úsalos para componentes
2. Si existe `assets/css/` o `src/styles/` — coloca los CSS ahí
3. Si existe `assets/js/` o `src/scripts/` — coloca los JS ahí
4. Si existe `assets/` pero no `assets/css/` ni `assets/js/` — crea `assets/css/` y `assets/js/` dentro
5. Si no existe ninguna estructura — crea la convencional según el stack

**Estructura recomendada por stack (solo si no existe):**

| Stack | Estructura |
|---|---|
| React / Next.js | `components/Componente.tsx` + `components/Componente.module.css` |
| Vue 3 | `components/Componente.vue` |
| Astro | `src/components/Componente.astro` |
| Vanilla | `assets/css/style.css`, `assets/js/main.js`, raíz `index.html` |
| Svelte | `src/lib/Componente.svelte` |

**Reglas obligatorias:**
- **Nunca sobrescribas** un archivo existente. Si el archivo ya existe, saltéalo.
- **Respeta la estructura actual**. Si el proyecto ya tiene `assets/css/`, úsala en lugar de crear una nueva.
- **Un archivo por preocupación**: HTML, CSS y JS siempre separados en archivos distintos, salvo que el framework tenga SFC como convención (Vue, Svelte, Astro).

### 3. Definir estructura base

- Establecer contenedor principal con max-width apropiado
- Usar grilla responsive con enfoque mobile-first
- Definir espaciado base (8px, 16px, 24px, 32px, 48px)
- Crear archivo de tema/constantes compartidas si hay más de 3 componentes

### 4. Aplicar principios de tipografía

- Seleccionar fuente limpia (San Francisco, -apple-system, Inter, system-ui)
- Establecer escala tipográfica: 12px, 14px, 16px, 20px, 24px, 32px, 48px
- Priorizar legibilidad con line-height 1.5 para body, 1.2 para headings
- Definir tipografia global y colores base en un archivo central de tema

### 5. Componer componentes visuales

Todos los valores visuales deben usar las variables CSS de `assets/css/global-theme.css`.

- **Cards**: `border-radius: var(--radius-lg)`, `box-shadow: var(--shadow-sm)`
- **Botones**: `border-radius: var(--radius-md)`, `padding: var(--space-sm) var(--space-lg)`, `transition: var(--transition-base)`
- **Inputs**: `border-radius: var(--radius-sm)`, borde sutil con `var(--color-border-soft)`, focus con `var(--color-accent)`
- **Menu topbar**: layout centrado en desktop y compacto en mobile
- **Hero**: bloque de texto centrado, CTAs en fila y media principal debajo

Para cada componente, usa el formato y sintaxis del stack detectado en el paso 1.

### 6. Añadir microinteracciones

- Transiciones de 200ms-300ms con ease-out
- Hover states con cambios sutiles de opacidad o escala
- Feedback visual inmediato en acciones del usuario

### 7. Verificar accesibilidad

- Contraste mínimo 4.5:1 para texto
- Espaciado suficiente para touch targets (min 44px)
- Estados focus visibles para navegación por teclado
- Atributos ARIA cuando el HTML semántico no sea suficiente

### 8. Aplicar medidas responsivas

- Usa sistema de breakpoints: 1068px, 834px, 734px, 480px
- Cambia el menu a mobile exactamente desde 834px
- Reescala tipografia y CTAs sin alterar la jerarquia visual
- Mantiene el contenido dinamico: imagenes y textos definidos por el usuario

## Ejemplos

### Ejemplo 1: Stack React + TypeScript — Card de producto

**Detección:** package.json contiene `react` y `typescript`

**Output esperado:**
```tsx
// components/ProductCard.tsx
interface ProductCardProps {
  title: string
  description: string
  price: number
  image: string
}

export function ProductCard({ title, description, price, image }: ProductCardProps) {
  return (
    <article className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-content">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        <span className="product-price">${price}</span>
      </div>
    </article>
  )
}
```

### Ejemplo 2: Stack Vue 3 + Composition API — Botón primario

**Detección:** package.json contiene `vue` y `@vitejs/plugin-vue`

**Output esperado:**
```vue
<!-- components/PrimaryButton.vue -->
<script setup lang="ts">
interface Props {
  label: string
  onClick?: () => void
}

withDefaults(defineProps<Props>(), {
  onClick: undefined,
})
</script>

<template>
  <button class="btn-primary" @click="onClick">
    {{ label }}
  </button>
</template>

<style scoped>
.btn-primary {
  background: var(--color-accent);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border: none;
  cursor: pointer;
  transition: var(--transition-base);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: scale(1.02);
}
</style>
```

### Ejemplo 3: Stack Vanilla HTML/CSS — Sección Hero

**Detección:** No se encontró framework; estructura HTML tradicional

**Output esperado:**
```html
<!-- hero.html -->
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">{{ title }}</h1>
    <p class="hero-subtitle">{{ subtitle }}</p>
    <div class="hero-actions">
      <button class="btn-primary">{{ ctaLabel }}</button>
      <button class="btn-secondary">{{ secondaryLabel }}</button>
    </div>
  </div>
</section>
```
```css
/* hero.css */
@import url("assets/css/global-theme.css");

.hero {
  max-width: var(--bp-desktop-compact);
  margin: 0 auto;
  padding: var(--space-3xl) var(--space-lg);
  text-align: center;
}
.hero-title {
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  margin-bottom: var(--space-md);
}
.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-xl);
}
```

## Errores Comunes

❌ Mezclar convenciones de frameworks diferentes → ✅ Usa siempre la convención del stack detectado

❌ Generar JSX en proyecto Vue o viceversa → ✅ Detecta el stack primero antes de escribir código

❌ Componentes enormes (>200 líneas) → ✅ Divide en subcomponentes pequeños con una responsabilidad

❌ Props sin tipar → ✅ Usa TypeScript interfaces o PropTypes según el stack

❌ Lógica de negocio mezclada con render → ✅ Extrae a custom hooks, composables o funciones helpers

❌ CSS global sin estructura → ✅ Usa CSS Modules, scoped styles o Tailwind según la convención del proyecto

❌ Mezclar HTML, CSS y JS inline en un mismo archivo → ✅ Separa cada lenguaje en su propio archivo (`.tsx` + `.module.css` o `.html` + `.css` + `.js`)

❌ Ignorar el sistema de archivos del proyecto → ✅ Genera los archivos en las carpetas que ya existen (`components/`, `pages/`, etc.)

❌ Crear carpetas nuevas ignorando las que ya existen → ✅ Inspecciona el proyecto primero y reutiliza `components/`, `assets/`, `src/` si ya están presentes

❌ Sobrescribir archivos del usuario → ✅ Siempre verifica si el archivo existe antes de crearlo; si existe, saltéalo

## Mejores Prácticas

- Priorizar simplicidad: cada elemento debe tener un propósito claro
- Usar whitespace como herramienta de jerarquía visual
- Mantener consistencia: mismo border-radius, sombras, spacing en toda la UI
- Preferir system fonts o fuentes neutras como Inter, SF Pro
- Testing en móvil primero, luego desktop
- Animaciones sutiles: nunca más de 300ms, ease-out preferible
- Un archivo por componente, con el mismo nombre del componente (PascalCase)
- Separar types/interfaces en un archivo `types.ts` si se comparten entre componentes

## Assets Incluidos

- CSS unificado global (tokens + componentes + base): `assets/css/global-theme.css`
- Referencia visual de apple.com/cl: `assets/index.pdf`
- Template base agnóstico al stack: `assets/templates/menu-template.html`
- Template base agnóstico al stack: `assets/templates/hero-template.html`
- Referencia de patrones: `references/menu-patterns.md`
- Referencia de patrones: `references/hero-patterns.md`
- Referencia responsiva: `references/responsive-measures.md`
- Tokens de diseño: `references/design-tokens.md`

## Uso de Assets

1. Revisa `assets/index.pdf` — es la referencia visual obligatoria antes de escribir cualquier componente.
2. Copia primero `assets/css/global-theme.css` — es la única fuente de verdad para colores, espaciado, radios, sombras, tipografía y breakpoints.
3. Usa los tokens con `var(--token)` en todos los componentes. Revisa `references/design-tokens.md` para saber qué token usar en cada contexto.
4. No hardcodees valores CSS en los componentes; siempre referencia las variables del tema.
5. Si el PDF muestra estilos o componentes que no están cubiertos por `global-theme.css`, agrega las variables o clases necesarias respetando el sistema de tokens existente.
6. Adapta los templates HTML al stack detectado (convierte a JSX, Vue SFC, etc.).
7. Reemplaza placeholders con el contenido entregado por el usuario.
8. Respeta el breakpoint del menú en `--bp-nav-mobile` (834px) para coincidir con la referencia.

## Recursos

- [Human Interface Guidelines - Apple](https://developer.apple.com/design/human-interface-guidelines)
- Archivo de referencia: `references/design-tokens.md`
- Archivo de referencia: `references/menu-patterns.md`
- Archivo de referencia: `references/hero-patterns.md`
- Archivo de referencia: `references/responsive-measures.md`
