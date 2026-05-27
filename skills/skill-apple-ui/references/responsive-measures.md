# Responsive Measures

Sistema de medidas responsivas inspirado en patrones de homepage de sitios de producto global.

## Breakpoints base

- `> 1068px`: desktop amplio
- `835px - 1068px`: desktop compacto / tablet horizontal
- `<= 834px`: mobile nav y bloques compactos
- `<= 734px`: mobile pequeno
- `<= 480px`: mobile estrecho

## Regla de navegacion

- El menu cambia a version mobile desde `834px`.
- En desktop (835px+) se mantiene barra con links completos.

## Escala de tipografia recomendada

- Hero title:
  - Desktop amplio: `56px - 72px`
  - Desktop compacto: `48px - 56px`
  - Mobile: `34px - 48px`
- Hero subtitle:
  - Desktop amplio: `32px - 46px`
  - Desktop compacto: `26px - 34px`
  - Mobile: `18px - 28px`

## Espaciado vertical por viewport

- Hero top padding:
  - Desktop amplio: `48px`
  - Desktop compacto: `44px`
  - Mobile: `32px - 36px`
- CTA group margin-top:
  - Desktop: `22px`
  - Mobile: `16px - 20px`
- Media margin-top:
  - Desktop: `28px`
  - Mobile: `22px - 26px`

## Contenedores

- Max width principal desktop: `1440px`.
- Padding horizontal:
  - Desktop: `20px`
  - Mobile: `14px - 16px`

## Principio de implementacion

- Mantener layout-first: ordenar elementos igual entre desktop y mobile.
- Reescalar solo tipografia, espaciados y tamano de CTAs.
- No fijar contenido: imagenes, textos y labels vienen del usuario.
