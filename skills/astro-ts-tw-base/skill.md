---
name: astro-ts-tw-base
description: Crea automáticamente un proyecto completo con Astro, TypeScript y Tailwind CSS. El agente ejecuta todo: inicializa proyecto, configura TypeScript strict, Tailwind completo, estructura src/, y levanta el servidor de desarrollo.
domain: desarrollo-web
version: 1.0.0
tags: [astro, typescript, tailwind, setup, proyecto]
---

# Astro + TypeScript + Tailwind Base

Esta skill inicializa un proyecto completo de Astro con TypeScript y Tailwind CSS completamente configurado.

## Cuándo usar esta skill

- Cuando necesitas crear un nuevo proyecto web desde cero
- Cuando quieres un setup profesional con TypeScript strict
- Cuando necesitas Tailwind CSS configurado con colores, tipografía y plugins
- Cuando quieres estructura de carpetas profesional lista para desarrollar

## Pasos de Ejecución

El agente debe ejecutar los siguientes pasos **en orden**:

### 1. Validar Prerequisites

Verificar que Node.js está instalado:
```bash
node --version
npm --version
```

### 2. Crear Proyecto Astro

Ejecutar en el directorio deseado:
```bash
npm create astro@latest . -- --template minimal --typescript strict --install --no-git -y
```

Si el directorio no está vacío, crear en subdirectorio o limpiar primero.

### 3. Instalar y Configurar Tailwind

```bash
npx astro add tailwind -y
```

### 4. Configurar TypeScript Strict

Asegurar que `tsconfig.json` tenga:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"],
      "@styles/*": ["src/styles/*"]
    }
  }
}
```

### 5. Crear Estructura de Carpetas

Crear la siguiente estructura en `src/`:
```
src/
├── components/     # Componentes reutilizables
├── layouts/        # Layouts base (BaseLayout.astro)
├── lib/            # Utilidades y helpers
├── pages/          # Páginas (ya existe index.astro)
├── styles/         # Archivos CSS globales
└── env.d.ts        # Tipos de entorno
```

### 6. Configurar Tailwind Completo

Actualizar `tailwind.config.mjs` con:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 7. Crear Archivo de Estilos Globales

Crear `src/styles/global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply scroll-smooth;
  }
  
  body {
    @apply antialiased;
  }
}
```

### 8. Crear Layout Base

Crear `src/layouts/BaseLayout.astro`:
```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Astro project' } = Astro.props;
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body class="bg-[#1d1d1f] text-[#f2f2f2] min-h-screen">
    <slot />
  </body>
</html>
```

### 9. Actualizar Página Principal

Actualizar `src/pages/index.astro`:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Welcome to Astro">
  <main class="max-w-4xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold text-[#f2f2f2] mb-4">
      Welcome to Astro
    </h1>
    <p class="text-lg text-gray-600 mb-8">
      Proyecto creado con astro-ts-tw-base skill
    </p>
    <div class="flex gap-4">
      <a href="https://docs.astro.build" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
        Documentación
      </a>
    </div>
  </main>
</BaseLayout>
```

### 10. Crear Archivos de Configuración Adicionales

#### .env.example
```
PUBLIC_SITE_URL=http://localhost:4321
```

#### .prettierrc
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

#### .eslintrc.json
```json
{
  "extends": ["astro/strict"]
}
```

### 11. Instalar Dependencias Adicionales (Opcional)

```bash
npm install
```

### 12. Levantar Servidor de Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:4321`

## Estructura Final del Proyecto

```
proyecto/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   ├── pages/
│   │   └── index.astro
│   ├── styles/
│   │   └── global.css
│   └── env.d.ts
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
└── README.md
```

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Construir para producción |
| `npm run preview` | Previsualizar build |
| `npm run astro check` | Verificar tipos |

## Notas

- El proyecto usa TypeScript strict
- Tailwind incluye configuración de colores primary
- Layout base incluye SEO básico (title, description)
- Estructura src/ sigue mejores prácticas
- Alias de paths configurados para imports limpios