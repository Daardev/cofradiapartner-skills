# @cofradiapartner/skills

![CofradiaPartner](assets/Cofra.png)

CLI para instalar skills reutilizables en proyectos locales con una carpeta unificada en `.agents/skills`.

## Instalacion

Recomendamos `pnpm` como primera opcion para instalar o ejecutar el CLI.

### Uso recomendado con pnpm

#### Ejecutar sin instalacion global

```bash
pnpm dlx @cofradiapartner/skills
```

#### Instalacion global

```bash
pnpm add -g @cofradiapartner/skills
create-skill
```

### Alternativa con npm

#### Ejecutar sin instalacion global

```bash
npx @cofradiapartner/skills
```

#### Instalacion global

```bash
npm install -g @cofradiapartner/skills
create-skill
```

## Comandos disponibles

```bash
create-skill
create-skill list
create-skill search <query>
create-skill validate <skillId>
create-skill validate --all
create-skill doctor
create-skill install <skillId...> [--target <path>] [--global] [--dry-run] [--yes] [--all]
create-skill create <skillName>
create-skill remove <skillId> [--target <path>] [--global] [--dry-run] [--yes]
create-skill update <skillId> [--target <path>] [--global] [--dry-run]
```

## Rutas por defecto

- Proyecto local: `.agents/skills`
- Instalacion global: `~/.agents/skills`

Precedencia de resolucion:

1. `--target`
2. `--global`
3. `.agents/skills` relativo a `process.cwd()`

## Reglas operativas del CLI

- La instalacion local siempre converge en `.agents/skills` salvo que se use `--target`.
- `--global` mueve la operacion a `~/.agents/skills`.
- `--target` tiene prioridad total sobre `--global` y sobre la ruta local por defecto.
- `remove` y `update` resuelven el mismo destino que `install`, usando exactamente la misma precedencia.
- `sourceSkillsDir` nunca debe tratarse como carpeta destino editable.

## sourceSkillsDir vs targetSkillsDir

- `sourceSkillsDir`: carpeta interna del paquete con las skills fuente (`skills/` dentro del paquete).
- `targetSkillsDir`: carpeta destino dentro del proyecto del usuario donde se instalan las skills.

Las operaciones destructivas (`remove`, `update`) tienen guardas para no tocar `sourceSkillsDir`.

## Ejemplos

### Modo interactivo

```bash
pnpm dlx @cofradiapartner/skills
```

El flujo interactivo pregunta si quieres instalar la skill en el entorno global o dentro de la ruta actual donde ejecutas el comando. Si eliges la ruta actual, luego puedes usar la ruta consolidada `.agents/skills` o indicar un destino custom.

El modo interactivo es persistente: al terminar una accion (listar, buscar, validar, instalar, doctor), el CLI vuelve al menu principal para que puedas seguir operando sin relanzar el comando.

La navegacion usa opciones explicitas de `Volver` en cada subflujo. `Esc` no forma parte del contrato oficial de navegacion.

Para salir de forma inmediata en cualquier momento, usa `Ctrl+C`.

En la opcion `Buscar skills`, si hay coincidencias puedes seleccionar una skill encontrada y continuar con el flujo normal de instalacion.

En la seleccion multiple de skills para instalar, usa `[espacio] para seleccionar`.

### Listar skills

```bash
pnpm dlx @cofradiapartner/skills list
```

### Buscar skills

```bash
pnpm dlx @cofradiapartner/skills search apple
```

### Instalar una skill en la ruta consolidada local

```bash
pnpm dlx @cofradiapartner/skills install skill-apple-ui
```

### Instalar varias skills

```bash
pnpm dlx @cofradiapartner/skills install skill-apple-ui skill-brand-ui
```

### Instalar todas las skills

```bash
pnpm dlx @cofradiapartner/skills install --all
```

### Usar target custom

```bash
pnpm dlx @cofradiapartner/skills install skill-apple-ui --target docs/ai-skills
```

### Instalar global

```bash
pnpm dlx @cofradiapartner/skills install skill-apple-ui --global
```

### Dry run

```bash
pnpm dlx @cofradiapartner/skills install skill-apple-ui --dry-run
```

### Validar una skill

```bash
pnpm dlx @cofradiapartner/skills validate skill-apple-ui
```

### Validar todas las skills

```bash
pnpm dlx @cofradiapartner/skills validate --all
```

### Ejecutar doctor

```bash
pnpm dlx @cofradiapartner/skills doctor
```

### Crear scaffold local de skill

```bash
pnpm dlx @cofradiapartner/skills create skill-demo
```

### Eliminar skill instalada

```bash
pnpm dlx @cofradiapartner/skills remove skill-apple-ui
```

### Actualizar skill instalada

```bash
pnpm dlx @cofradiapartner/skills update skill-apple-ui
```

### Actualizar skill global

```bash
pnpm dlx @cofradiapartner/skills update skill-apple-ui --global
```

### Eliminar skill global

```bash
pnpm dlx @cofradiapartner/skills remove skill-apple-ui --global
```

## Protecciones importantes

- `install --all` no acepta IDs posicionales.
- `validate --all` no acepta ID posicional.
- `install` sin IDs y sin `--all` falla.
- `remove` y `update` rechazan targets dentro de `sourceSkillsDir`.
- `--dry-run` no modifica archivos.

## Desarrollo local

```bash
pnpm install
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run test:coverage
pnpm run build
```

Alternativa equivalente con npm:

```bash
npm install
npm run typecheck
npm run lint
npm run test
npm run test:coverage
npm run build
```

## Publicacion en npm

Este paquete esta preparado para publicarse como `@cofradiapartner/skills`.

Pasos tipicos:

```bash
pnpm run changeset
pnpm run version-packages
pnpm run build
npm publish --access public
```

## Como agregar nuevas skills al repo

1. Crear una carpeta dentro de `skills/` con un ID unico.
2. Agregar `skill.md` con frontmatter obligatorio:
   - `name`
   - `description`
3. Agregar `examples.md` y `README.md`.
4. Ejecutar `pnpm run test` y `pnpm dlx @cofradiapartner/skills validate --all`.

## Skills incluidas

- `skill-apple-ui`

## Documentacion interna

- `docs/cli-operating-rules.md`
