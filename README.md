# @cofradiapartner/skills

![CofradiaPartner](assets/Cofra.png)

CLI para instalar skills reutilizables en proyectos locales con una carpeta unificada en `.agents/skills`.

## Instalacion

### Uso con npx

```bash
npx @cofradiapartner/skills
```

### Instalacion global

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
npx @cofradiapartner/skills
```

El flujo interactivo pregunta si quieres instalar la skill en el entorno global o dentro de la ruta actual donde ejecutas el comando. Si eliges la ruta actual, luego puedes usar la ruta consolidada `.agents/skills` o indicar un destino custom.

El modo interactivo es persistente: al terminar una accion (listar, buscar, validar, instalar, doctor), el CLI vuelve al menu principal para que puedas seguir operando sin relanzar el comando.

La navegacion usa opciones explicitas de `Volver` en cada subflujo. `Esc` no forma parte del contrato oficial de navegacion.

Para salir de forma inmediata en cualquier momento, usa `Ctrl+C`.

En la opcion `Buscar skills`, si hay coincidencias puedes seleccionar una skill encontrada y continuar con el flujo normal de instalacion.

En la seleccion multiple de skills para instalar, usa `[espacio] para seleccionar`.

### Listar skills

```bash
npx @cofradiapartner/skills list
```

### Buscar skills

```bash
npx @cofradiapartner/skills search apple
```

### Instalar una skill en la ruta consolidada local

```bash
npx @cofradiapartner/skills install skill-apple-ui
```

### Instalar varias skills

```bash
npx @cofradiapartner/skills install skill-apple-ui skill-brand-ui
```

### Instalar todas las skills

```bash
npx @cofradiapartner/skills install --all
```

### Usar target custom

```bash
npx @cofradiapartner/skills install skill-apple-ui --target docs/ai-skills
```

### Instalar global

```bash
npx @cofradiapartner/skills install skill-apple-ui --global
```

### Dry run

```bash
npx @cofradiapartner/skills install skill-apple-ui --dry-run
```

### Validar una skill

```bash
npx @cofradiapartner/skills validate skill-apple-ui
```

### Validar todas las skills

```bash
npx @cofradiapartner/skills validate --all
```

### Ejecutar doctor

```bash
npx @cofradiapartner/skills doctor
```

### Crear scaffold local de skill

```bash
npx @cofradiapartner/skills create skill-demo
```

### Eliminar skill instalada

```bash
npx @cofradiapartner/skills remove skill-apple-ui
```

### Actualizar skill instalada

```bash
npx @cofradiapartner/skills update skill-apple-ui
```

### Actualizar skill global

```bash
npx @cofradiapartner/skills update skill-apple-ui --global
```

### Eliminar skill global

```bash
npx @cofradiapartner/skills remove skill-apple-ui --global
```

## Protecciones importantes

- `install --all` no acepta IDs posicionales.
- `validate --all` no acepta ID posicional.
- `install` sin IDs y sin `--all` falla.
- `remove` y `update` rechazan targets dentro de `sourceSkillsDir`.
- `--dry-run` no modifica archivos.

## Desarrollo local

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
npm run changeset
npm run version-packages
npm run build
npm publish --access public
```

## Como agregar nuevas skills al repo

1. Crear una carpeta dentro de `skills/` con un ID unico.
2. Agregar `skill.md` con frontmatter obligatorio:
   - `name`
   - `description`
3. Agregar `examples.md` y `README.md`.
4. Ejecutar `npm run test` y `create-skill validate --all`.

## Skills incluidas

- `skill-apple-ui`

## Documentacion interna

- `docs/cli-operating-rules.md`
