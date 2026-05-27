# Design Tokens

Todos los tokens de diseño están definidos en `assets/css/global-theme.css`. Copia ese archivo en tu proyecto e importa las variables con `var(...)`.

> Para ver los valores reales abre `assets/css/global-theme.css`.

## Colores

### Backgrounds
| Token | Uso |
|---|---|
| `--color-bg-page` | Fondo principal de página |
| `--color-bg-elevated` | Fondo de cards y contenedores elevados |
| `--color-bg-muted` | Fondo neutro para secciones secundarias |
| `--color-bg-overlay` | Superficies translúcidas (menús, modales) |
| `--color-bg-inverse` | Fondo oscuro para secciones destacadas |

### Texto
| Token | Uso |
|---|---|
| `--color-text-primary` | Títulos, texto principal |
| `--color-text-secondary` | Subtítulos, descripciones |
| `--color-text-tertiary` | Texto de baja jerarquía (metadatos) |
| `--color-text-inverse` | Texto sobre fondo oscuro |
| `--color-text-link` | Links |

### Acento y estados
| Token | Uso |
|---|---|
| `--color-accent` | Botones primarios, links, acentos |
| `--color-accent-hover` | Hover de botón primario |
| `--color-accent-active` | Active/pressed de botón primario |
| `--color-success` | Estados exitosos |
| `--color-warning` | Advertencias |
| `--color-error` | Errores |

### Bordes
| Token | Uso |
|---|---|
| `--color-border-soft` | Bordes sutiles |
| `--color-border-medium` | Bordes visibles |
| `--color-border-strong` | Bordes destacados (separadores) |

## Espaciado

| Token | Uso |
|---|---|
| `--space-xs` | Espaciado mínimo (4px) |
| `--space-sm` | Espaciado pequeño (8px) |
| `--space-md` | Espaciado base (16px) |
| `--space-lg` | Espaciado amplio (24px) |
| `--space-xl` | Espaciado grande (32px) |
| `--space-2xl` | Espaciado muy grande (48px) |
| `--space-3xl` | Espaciado extra grande (64px) |
| `--space-4xl` | Espaciado máximo (80px) |

## Border Radius

| Token | Uso |
|---|---|
| `--radius-sm` | Inputs, badges |
| `--radius-md` | Botones |
| `--radius-lg` | Cards |
| `--radius-xl` | Modals, dialogs |
| `--radius-full` | Pills, avatares circulares |

## Sombras

| Token | Uso |
|---|---|
| `--shadow-sm` | Sombra sutil (cards, botones) |
| `--shadow-md` | Sombra media (modales, dropdowns) |
| `--shadow-lg` | Sombra elevada (notificaciones, overlays) |

## Tipografía

### Font Family
| Token | Uso |
|---|---|
| `--font-family-sans` | Texto general, títulos |
| `--font-family-mono` | Código, datos técnicos |

### Font Size
| Token | Uso |
|---|---|
| `--font-size-xs` | Metadatos, badges |
| `--font-size-sm` | Texto secundario |
| `--font-size-base` | Texto base (body) |
| `--font-size-lg` | Subtítulos |
| `--font-size-xl` | Títulos pequeños |
| `--font-size-2xl` | Títulos grandes (h1) |
| `--font-size-3xl` | Display / hero |

### Line Height
| Token | Uso |
|---|---|
| `--line-height-tight` | Títulos, headings |
| `--line-height-base` | Botones, inputs |
| `--line-height-copy` | Párrafos, body |

### Letter Spacing
| Token | Uso |
|---|---|
| `--letter-spacing-tight` | Títulos grandes, display |
| `--letter-spacing-normal` | Texto general |
| `--letter-spacing-wide` | Texto en mayúsculas (labels) |

### Font Weight
| Token | Uso |
|---|---|
| `--font-weight-regular` | Texto base |
| `--font-weight-medium` | Botones, links |
| `--font-weight-semibold` | Subtítulos |
| `--font-weight-bold` | Títulos |

## Transiciones

| Token | Uso |
|---|---|
| `--transition-fast` | Hover states, microinteracciones rápidas |
| `--transition-base` | Transiciones estándar |
| `--transition-slow` | Animaciones de entrada, modales |

## Breakpoints

| Token | Uso |
|---|---|
| `--bp-desktop-wide` | Pantallas ultra anchas (>= 1440px) |
| `--bp-desktop-compact` | Desktop compacto (>= 1068px) |
| `--bp-nav-mobile` | Punto de quiebre del menú (834px) |
| `--bp-mobile` | Mobile (<= 734px) |
| `--bp-mobile-small` | Mobile pequeño (<= 480px) |
