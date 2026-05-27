---
name: apple-ui
description: Usa esta skill cuando el usuario necesite crear interfaces web o móviles con diseño premium, minimalista, limpio y moderno inspiradas en sistemas de diseño tipo Apple. Incluye: UI components, interfaces minimalistas, diseño limpio, componentes premium, cards suaves, bordes redondeados, sombras sutiles, tipografía limpia, espaciado amplio, mobile-first, microinteracciones.
metadata:
  version: "1.0.0"
  author: "Darwi"
  tags: [ui, design, frontend, apple, minimal, premium, responsive]
compatibility: "HTML, CSS, React, Vue, o cualquier framework de frontend"
---

# Apple UI Skill

Esta skill orienta la generación de interfaces con una dirección visual premium, limpia y moderna siguiendo principios de diseño Apple.

## Cuándo Usar

- Crear componentes UI desde cero con estética premium
- Rediseñar interfaces existentes con enfoque minimalista
- Necesitar cards, botones, formularios con bordes redondeados y sombras suaves
- Implementar layouts responsivos mobile-first
- Aplicar tipografía limpia con jerarquía visual clara
- Añadir microinteracciones discretas y feedback visual

## Reglas de Contenido

- Copia el layout y la posicion de elementos de las referencias visuales del usuario.
- No hardcodees textos, imagenes ni nombres de producto.
- No menciones marcas ni categorias de producto si el usuario no lo pide.
- Usa placeholders o variables para que el contenido final lo aporte el usuario.

## Paso a Paso

### 1. Definir estructura base
- Establecer contenedor principal con max-width apropiado
- Usar grilla responsive con enfoque mobile-first
- Definir espaciado base (8px, 16px, 24px, 32px, 48px)

### 2. Aplicar principios de tipografía
- Seleccionar fuente limpia (San Francisco, -apple-system, Inter, system-ui)
- Establecer escala tipográfica: 12px, 14px, 16px, 20px, 24px, 32px, 48px
- Priorizar legibilidad con line-height 1.5 para body, 1.2 para headings
- Definir tipografia global y colores base en un archivo central de tema

### 3. Componer componentes visuales
- Cards: border-radius 12px-20px, sombra sutil (box-shadow: 0 2px 8px rgba(0,0,0,0.08))
- Botones: border-radius 8px-12px, padding 12px 20px, transiciones suaves
- Inputs: border-radius 8px, borde sutil, focus con ring suave
- Menu topbar: usar layout centrado en desktop y version compacta en mobile
- Cambiar el menu a mobile exactamente desde 834px con `@media (max-width: 834px)`
- Hero: bloque de texto centrado, CTAs en fila y media principal debajo, manteniendo orden visual

### 4. Añadir microinteracciones
- Transiciones de 200ms-300ms con ease-out
- Hover states con cambios sutiles de opacidad o escala
- Feedback visual inmediato en acciones del usuario

### 5. Verificar accesibilidad
- Contraste mínimo 4.5:1 para texto
- Espaciado suficiente para touch targets (min 44px)
- Estados focus visibles para navegación por teclado

### 6. Aplicar medidas responsivas
- Usa sistema de breakpoints: 1068px, 834px, 734px, 480px
- Cambia el menu a mobile exactamente desde 834px
- Reescala tipografia y CTAs sin alterar la jerarquia visual
- Mantiene el contenido dinamico: imagenes y textos definidos por el usuario

## Ejemplos

### Ejemplo 1: Card de producto
**Input:** Crear una card para mostrar información de un producto
**Output:**
```jsx
<div className="product-card">
  <img src={image} alt={title} className="product-image" />
  <div className="product-content">
    <h3 className="product-title">{title}</h3>
    <p className="product-description">{description}</p>
    <span className="product-price">${price}</span>
  </div>
</div>
```
Con estilos: border-radius: 16px, box-shadow: 0 4px 12px rgba(0,0,0,0.08), transición hover 0.2s ease

### Ejemplo 2: Botón primario
**Input:** Botón con estilo Apple premium
**Output:**
```css
.btn-primary {
  background: #007aff;
  color: white;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background: #0062cc;
  transform: scale(1.02);
}
```

## Errores Comunes

❌ Usar bordes muy pronunciados (border-radius > 24px) → ✅ Mantener border-radius entre 8px-20px para un look premium

❌ Sombras excesivamente fuertes → ✅ Usar sombras sutiles: 0 2px 8px o 0 4px 12px con opacidad baja

❌ Demasiados colores y gradientes → ✅ Fondos neutros (#ffffff, #f5f5f7), un color de acento (#007aff)

❌ Espaciado inconsistente → ✅ Usar múltiplos de 8px: 8, 16, 24, 32, 48, 64

❌ Ignorar estados hover/focus → ✅ Añadir transiciones suaves y indicadores de foco para accesibilidad

## Mejores Prácticas

- Priorizar simplicidad: cada elemento debe tener un propósito claro
- Usar whitespace como herramienta de jerarquía visual
- Mantener consistencia: mismo border-radius, sombras, spacing en toda la UI
- Preferir system fonts o fuentes neutras como Inter, SF Pro
- Testing en móvil primero, luego desktop
- Animaciones sutiles: nunca más de 300ms, ease-out preferible

## Assets Incluidos

- CSS de tema global (fondos, textos, tipografia): `assets/css/global-theme.css`
- CSS reutilizable: `assets/css/apple-menu.css`
- CSS reutilizable: `assets/css/hero-layout.css`
- Template base agnóstico al stack: `assets/templates/menu-template.html`
- Template base agnóstico al stack: `assets/templates/hero-template.html`
- Referencia de patrones: `references/menu-patterns.md`
- Referencia de patrones: `references/hero-patterns.md`
- Referencia responsiva: `references/responsive-measures.md`

## Uso de Assets

1. Copia primero `assets/css/global-theme.css` para inicializar colores y tipografia.
2. Copia `assets/css/apple-menu.css` en tu proyecto.
3. Copia tambien `assets/css/hero-layout.css` para layouts hero.
4. Inserta `assets/templates/menu-template.html` y `assets/templates/hero-template.html`.
5. Reemplaza placeholders con el contenido entregado por el usuario.
6. Mantén los nombres de clase para conservar consistencia visual.
7. Respeta el breakpoint del menu en `834px` para coincidir con la referencia.

## Recursos

- [Human Interface Guidelines - Apple](https://developer.apple.com/design/human-interface-guidelines)
- Archivo de referencia: `references/design-tokens.md`
- Archivo de referencia: `references/menu-patterns.md`
- Archivo de referencia: `references/hero-patterns.md`
- Archivo de referencia: `references/responsive-measures.md`
