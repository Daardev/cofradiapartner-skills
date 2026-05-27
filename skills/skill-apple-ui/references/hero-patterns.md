# Hero Patterns

Guia de composicion para hero basada en referencia visual, centrada en layout y posicion de elementos.

## Regla de contenido

- No fijar textos, imagenes ni marca en la implementacion.
- Siempre usar contenido entregado por el usuario final.
- Reproducir solo estructura visual, ritmo y posicionamiento.

## Estructura

1. Bloque superior centrado con titulo, subtitulo y CTAs.
2. Grupo de acciones en fila con boton primario y secundario.
3. Imagen principal grande debajo del texto, centrada y dominante.

## Espaciado recomendado

- Separacion titulo -> subtitulo: 8-12px.
- Separacion subtitulo -> CTAs: 20-24px.
- Separacion CTAs -> media: 24-32px.

## Responsive

- Mantener jerarquia y alineacion centrada en desktop y mobile.
- Reescalar tipografia y botones en mobile, sin cambiar orden visual.
- Compatible con breakpoint del menu: `834px`.

## Implementacion agnostica al stack

1. Copia `assets/css/global-theme.css` (contiene los estilos de hero unificados).
2. Copia `assets/templates/hero-template.html` y reemplaza placeholders.
3. Adapta el marcado a React/Vue/Svelte/HTML sin renombrar clases.
