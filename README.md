# @cofradiapartner/skills

![CofradiaPartner](assets/Cofra.png)

CLI para instalar skills reutilizables en proyectos locales y usarlas con agentes como Claude, Codex, OpenCode, Cursor, Windsurf y Generic.

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
create-skill agents
create-skill validate <skillId>
create-skill validate --all
create-skill doctor
create-skill install <skillId...> [--agent <agent>] [--target <path>] [--dry-run] [--yes] [--all]
create-skill create <skillName>
create-skill remove <skillId> [--agent <agent>] [--target <path>] [--dry-run] [--yes]
create-skill update <skillId> [--agent <agent>] [--target <path>] [--dry-run]
```

## Agentes soportados

- `claude` (default)
- `codex`
- `opencode`
- `cursor`
- `windsurf`
- `generic`

## Rutas por defecto

Todas las rutas destino se resuelven contra `process.cwd()`.

- `claude` -> `.claude/skills`
- `codex` -> `.codex/skills`
- `opencode` -> `.opencode/skills`
- `cursor` -> `.cursor/rules`
- `windsurf` -> `.windsurf/rules`
- `generic` -> `skills`

## sourceSkillsDir vs targetSkillsDir

- `sourceSkillsDir`: carpeta interna del paquete con las skills fuente (`skills/` dentro del paquete).
- `targetSkillsDir`: carpeta destino dentro del proyecto del usuario donde se instalan las skills.

Las operaciones destructivas (`remove`, `update`) tienen guardas para no tocar `sourceSkillsDir`.

## Ejemplos

### Modo interactivo

```bash
npx @cofradiapartner/skills
```

### Listar skills

```bash
npx @cofradiapartner/skills list
```

### Ver agentes

```bash
npx @cofradiapartner/skills agents
```

### Instalar una skill

```bash
npx @cofradiapartner/skills install skill-apple-ui --agent claude
```

### Instalar varias skills

```bash
npx @cofradiapartner/skills install skill-apple-ui skill-brand-ui --agent codex
```

### Instalar todas las skills

```bash
npx @cofradiapartner/skills install --all --agent opencode
```

### Usar target custom

```bash
npx @cofradiapartner/skills install skill-apple-ui --agent claude --target docs/ai-skills
```

### Dry run

```bash
npx @cofradiapartner/skills install skill-apple-ui --agent claude --dry-run
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
npx @cofradiapartner/skills remove skill-apple-ui --agent claude
```

### Actualizar skill instalada

```bash
npx @cofradiapartner/skills update skill-apple-ui --agent claude
```

## Protecciones importantes

- `install --all` no acepta IDs posicionales.
- `validate --all` no acepta ID posicional.
- `install` sin IDs y sin `--all` falla.
- Agente invalido falla con exit code no cero.
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

## Como agregar nuevos agentes

1. Agregar el nuevo `AgentId` en `src/types/agent.ts`.
2. Agregar su definicion en `src/core/agents.ts` con ruta por defecto.
3. Verificar resolucion de rutas en `src/core/resolve-target-path.ts`.
4. Agregar/ajustar tests en `tests/agents.test.ts` y `tests/resolve-target-path.test.ts`.
