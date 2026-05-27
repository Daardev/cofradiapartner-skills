# Design Tokens

Referencia rapida de tokens de diseno para crear interfaces premium limpias y neutrales.

## Colores

### Primarios
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | #0071e3 | Botones primarios, links, acentos |
| `--color-secondary` | #5856d6 | Secondary actions |
| `--color-success` | #34c759 | Estados exitosos |
| `--color-warning` | #ff9500 | Warnings |
| `--color-error` | #ff3b30 | Errores |

### Neutros
| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg-primary` | #ffffff | Fondo principal |
| `--color-bg-secondary` | #fbfbfd | Fondo elevado |
| `--color-bg-tertiary` | #f5f5f7 | Fondo neutro |
| `--color-bg-overlay` | rgba(245, 245, 247, 0.94) | Superficies translucidas |
| `--color-text-primary` | #1d1d1f | Texto principal |
| `--color-text-secondary` | #424245 | Texto secundario |
| `--color-text-tertiary` | #6e6e73 | Texto terciario |
| `--color-border-soft` | rgba(0, 0, 0, 0.08) | Bordes suaves |

## Espaciado

| Token | Valor |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 64px |

## Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 6px | Inputs, badges |
| `--radius-md` | 10px | Botones |
| `--radius-lg` | 14px | Cards |
| `--radius-xl` | 20px | Modals, dialogs |
| `--radius-full` | 9999px | Pills, avatares |

## Sombras

```css
/* Suave */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);

/* Medium */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);

/* Elevado */
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
```

## Tipografía

### Font Family
```css
--font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
```

### Escala
| Token | Tamaño | Line Height |
|-------|--------|-------------|
| `--text-xs` | 12px | 1.33337 |
| `--text-sm` | 14px | 1.28577 |
| `--text-base` | 17px | 1.47059 |
| `--text-lg` | 21px | 1.381 |
| `--text-xl` | 28px | 1.14286 |
| `--text-2xl` | 40px | 1.1 |
| `--text-3xl` | 56px | 1.07143 |

### Pesos
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## Transiciones

```css
--transition-fast: 150ms ease-out;
--transition-base: 200ms ease-out;
--transition-slow: 300ms ease-out;
```

## Breakpoints

| Breakpoint | Ancho |
|------------|-------|
| Mobile | <= 734px |
| Tablet | 735px - 1068px |
| Desktop | >= 1069px |
| Desktop Wide | >= 1440px |
