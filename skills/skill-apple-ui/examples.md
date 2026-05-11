# Examples - Apple UI Skill

Coleccion de ejemplos detallados por categoria. Cada ejemplo incluye contexto, requisitos especificos y output esperado.

---

## Categoria: Landing Pages

### Ejemplo 1: Landing SaaS Premium

**Prompt:**
Disena una landing page para un producto SaaS de productividad con las siguientes caracteristicas:

- Hero: titulo principal "Organiza tu trabajo en un solo lugar", subtitulo descriptivo, dos CTAs ("Empezar gratis" primario, "Ver demo" secundario)
- Seccion de features: 3 columnas con iconos, titulo y descripcion corta
- Social proof: logos de empresas confianza en fila horizontal
- Testimonios: 3 tarjetas con foto, nombre, rol y cita
- Pricing: 3 planes en cards, highlight del plan popular
- CTA final: fondo accent, titulo y boton primario
- Footer: 4 columnas con links, newsletter signup

Requisitos:
- Mobile-first, responsive hasta 1440px
- Usar escala tipografica Apple (34px display, 22px heading, 16px body)
- Espaciado multiples de 8px
- Cards con border-radius 16px y sombras sutiles
- Animaciones hover suaves en botones (200ms ease-out)
- Colores: fondo #FFFFFF, texto #1D1D1F, acento #0071E3

**Output esperado:**
- HTML/CSS completo o componente de framework
- Sistema de variables CSS para colores y spacing
- Implementacion mobile-first con media queries

---

### Ejemplo 2: Landing Page App Mobile

**Prompt:**
Crea una landing page para una app mobile de salud/fitness con:

- Header fijo con logo, nav links y boton descarga
- Hero: telefono mockup mostrando la app, titulo, rating stars, install buttons
- Features en zig-zag: imagen alternando izquierda/derecha con texto
- Seccion "Como funciona": 3 pasos con numeros grandes y icons
- Testimonios en carousel horizontal
- Seccion descarga: fondogradiente sutil, device mockups
- Footer con links y social icons

Requisitos:
- Enfoque visual hacia jovenes profesionales (25-40 anos)
- Usar gradiente sutil en lugar de solido para secciones destacadas
- Incorporar ratings de App Store en el hero
- Animaciones de entrada suaves (staggered reveal)
- Touch targets de 44px en botones

---

### Ejemplo 3: Landing Page Newsletter

**Prompt:**
Disena una landing page minima para newsletter de tecnologia con:

- Header: logo simple, nav minima
- Hero: titulo large, email input grande + boton subscribe, confianza (subscriber count)
- Beneficios: lista de 4-5 items con check icons
- Preview: screenshot del ultimo email en marco de navegador
- Testimonio de suscriptor известный
- Footer: links legales, social links

Requisitos:
- Estilo ultra-minimalista, unica pagina
- Input de email prominent y facil de usar
- Mostrar autoridad con numeros (suscriptores, years)
- Optimizada para conversion
- Mobile: stacked, input full width

---

## Categoria: Dashboards

### Ejemplo 4: Dashboard Analytics

**Prompt:**
Construye un dashboard de analytics para un producto SaaS con:

- Sidebar: logo, nav items (Dashboard, Analytics, Users, Settings), user profile bottom
- Header: titulo pagina, date picker, search, notifications bell, profile dropdown
- KPI cards row: 4 metricas con icon, valor, label, trend indicator (up/down arrow con %)
- Main chart: area chart grandes con datos de visitantes, linea de tendencia
- Tabla de datos: headers sortable, rows con paginacion, actions menu
- Quick actions: 3 botones superiores para exportar, refresh, filter

Requisitos:
- Sidebar collapsible en tablet (hamburger menu)
- Charts con tooltips en hover
- Tabla con skeleton loading state
- Dark mode toggle en header
- Export en CSV y PDF
- Responsive: sidebar becomes drawer en mobile

---

### Ejemplo 5: Dashboard E-commerce Admin

**Prompt:**
Crea un panel de administracion para tienda e-commerce con:

- Top bar: logo, search global, notification badge, user menu
- Stats overview: revenue, orders, customers, conversion rate en grid 4x1
- Grafico de ventas: bar chart semanal con tooltips
- Recent orders table: ID, customer, product, amount, status badge, date
- Quick actions: Add product, Process orders, View reports
- Low stock alerts: lista de productos con stock critico

Requisitos:
- Status badges con colores: verde (completed), amarillo (pending), rojo (cancelled)
- Search filtro en tiempo real para orders
- Click en ordenabre detalle en modal
- Indicadores visuales para metricas arriba/abajo del objetivo

---

### Ejemplo 6: Dashboard Project Management

**Prompt:**
Disena un dashboard de gestion de proyectos tipo Notion/Asana con:

- Sidebar projects: lista de proyectos con active state, New project button
- Main area: Kanban board con 4 columnas (Backlog, In Progress, Review, Done)
- Cards en kanban: titulo, assign avatar, priority tag, due date, comment count
- Detail panel slide-in desde right para ver task completo
- Header: proyecto titulo, miembros avatars, filter dropdown, view toggle (board/list)
- Quick add: input inline para crear task rapidamente

Requisitos:
- Drag and drop visual en cards (indicar con cursor change)
- Priority tags: Low (gray), Medium (yellow), High (red)
- Fechas relativas ("Due tomorrow", "Overdue")
- Collapse de columnas completas

---

## Categoria: E-commerce

### Ejemplo 7: Pagina Producto E-commerce

**Prompt:**
Crea una pagina de producto para una tienda de tecnologia con:

- Breadcrumb: Home > Categoria > Producto
- Gallery: imagen principal grande, thumbnails row debajo, lightbox al click
- Info panel: titulo, precio con discount, rating stars, stock status
- Variants: color selector (circulos), size dropdown
- Add to cart: quantity selector, boton grande "Agregar al Carrito", wishlist icon
- Tabs: Descripcion, Especificaciones, Reviews
- Reviews: rating summary (4.5/5 con breakdown), lista de reviews, write review button
- Related products: carousel de 4-5 productos relacionados

Requisitos:
- Gallery con zoom en hover de imagen principal
- Variant selection actualiza imagen principal
- Stock bajo mostrar "Solo quedan X" en rojo
- Agregar animacion de "added to cart" con feedback visual

---

### Ejemplo 8: Carrito de Compras

**Prompt:**
Construye una pagina de carrito de compras con:

- Listado de items: imagen thumbnail, titulo, variant info, quantity controls, price, remove button
- Order summary: subtotal, shipping estimate, taxes, total
- Promo code input: input + apply button
- Checkout CTA: boton grande "Proceder al Pago"
- Trust badges: metodos de pago, seguridad, envios
- Continue shopping link

Requisitos:
- Quantity controls con limites de stock
- Remover item con confirmacion suave
- Actualizacion de precio en tiempo real
- Mobile: items en stacked card layout
- Empty cart state con CTA para seguir comprando

---

### Ejemplo 9: Categoria / Coleccion

**Prompt:**
Disena una pagina de categoria de productos (ej: "Zapatillas") con:

- Header de categoria: titulo, breadcrumb, result count
- Filters sidebar: price range slider, brand checkboxes, color swatches, size buttons
- Sort dropdown: Relevance, Price low-high, Price high-low, Newest
- Product grid: 3-4 columnas, cards con imagen, titulo, precio, rating
- Pagination o infinite scroll
- Active filters displayed como removable tags

Requisitos:
- Grid responsive: 4 cols desktop, 3 tablet, 2 mobile
- Filter actualiza URL para shareable state
- Skeleton loading en inicial load
- Quick view en hover de producto

---

## Categoria: Componentes

### Ejemplo 10: Formulario de Registro

**Prompt:**
Crea un formulario de registro/login con:

- Container centrado, max-width 400px
- Header: titulo, subtitle con link a login
- Campos: nombre completo, email, password con toggle visibility, checkbox terminos
- Submit button full-width
- Social login buttons (Google, Apple, Facebook)
- Footer: links a Terms, Privacy

Requisitos:
- Labels flotantes en inputs
- Validation states: error border red, success border green, mensaje debajo
- Password requirements checklist en tiempo real
- Loading state en boton submit
- "Show password" toggle icon

---

### Ejemplo 11: Navigation Components

**Prompt:**
Disena un sistema de navegacion completo:

- Desktop header: logo, nav links (products, pricing, about, contact), auth buttons
- Mobile header: logo, hamburger menu
- Mobile drawer: full-screen overlay con nav links, close button, secondary links
- Footer desktop: 4 columnas (Product, Company, Resources, Legal)
- Footer mobile: accordions colapsables

Requisitos:
- Header con shadow en scroll
- Mobile menu con transition slide-in
- Active nav state con underline
- Footer links con hover underline

---

## Categoria: Mobile App

### Ejemplo 12: Pantalla Login Mobile

**Prompt:**
Crea una pantalla de login para app mobile con:

- Logo/brand en top center
- Welcome text: "Bienvenido de nuevo"
- Email input con keyboard tipo email
- Password input con show/hide toggle
- "Olvidaste tu contraseña?" link
- Primary login button full-width
- Divider con "o continua con"
- Social login buttons (Apple, Google)
- "No tienes cuenta? Registrate" link

Requisitos:
- Keyboard type apropiado para cada input
- Focus states claros
- Loading en boton durante login
- Error messages en rojo debajo de campos

---

### Ejemplo 13: Pantalla Perfil Usuario

**Prompt:**
Disena una pantalla de perfil de usuario para app mobile con:

- Header con titulo "Mi Perfil" y settings icon
- User info section: avatar (editable), nombre, email, member since
- Menu sections con icons:
  - Mis pedidos (chevron)
  - Metodos de pago (chevron)
  - Direcciones (chevron)
  - Notificaciones (toggle)
  - Ayuda (chevron)
- Cerrar sesion button al final
- Version app en footer

Requisitos:
- Avatar editable con camera icon overlay
- List items con divider lines
- Toggle switches para boolean settings
- Pull to refresh en content

---

## Guia de Estilo para Todos los Ejemplos

**Colores obligatorios:**
- Fondo: #FFFFFF (claro), #000000 (oscuro)
- Texto: #1D1D1F (claro), #F5F5F7 (oscuro)
- Acento: #0071E3
- Estados: #34C759 (success), #FF9500 (warning), #FF3B30 (error)
- Borders: #D2D2D7

**Tipografia:**
- Display/Headings: -apple-system, BlinkMacSystemFont, system-ui
- Body: misma familia, 16-17px base

**Spacing:**
- Multiples de 8px exclusivamente

**Border-radius:**
- Buttons: 10px
- Cards: 16px
- Inputs: 10px
- Images: 12px

**Animaciones:**
- Duracion: 200-300ms
- Easing: ease-out para entry, ease-in para exit
- Hover: scale 1.02-1.05 en botones

**Accesibilidad:**
- Contraste minimo 4.5:1
- Touch targets 44px minimo
- Focus visible siempre