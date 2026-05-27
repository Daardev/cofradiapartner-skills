# Menu Patterns

Guia de menu topbar estilo Apple basada en referencias visuales del proyecto.

## Regla de Responsividad

- Desktop: usar menu completo para anchos mayores a 834px.
- Mobile: cambiar a version compacta desde 834px hacia abajo.
- Breakpoint obligatorio: `@media (max-width: 834px)`.

## Estructura

- Desktop: links centrados + acciones de busqueda/bolsa a la derecha.
- Mobile: ocultar links de navegacion, dejar acciones + icono menu.
- Altura recomendada: 44px desktop, 48px mobile.

## Tokens recomendados

- Fondo: `rgba(245, 245, 247, 0.94)`
- Texto: `#1d1d1f`
- Borde inferior: `1px solid rgba(0, 0, 0, 0.06)`
- Blur: `backdrop-filter: saturate(180%) blur(16px)`
- Espaciado links desktop: `34px`

## Implementacion agnostica al stack

1. Copia `assets/css/global-theme.css` en tu proyecto (contiene los estilos de navegación unificados).
2. Copia `assets/templates/menu-template.html` y adapta el marcado a tu framework.
3. Mantiene clases BEM para evitar romper estilos.
4. Si usas React/Vue/Svelte, conserva la estructura de clases y reemplaza solo handlers/eventos.
