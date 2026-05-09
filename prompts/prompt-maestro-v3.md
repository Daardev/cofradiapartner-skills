# Prompt maestro v3 — Proyecto `@cofradiapartner/skills`

## Modelo recomendado

```txt
GPT-5.4
```

Este archivo sirve como referencia completa de arquitectura y alcance. No lo uses completo en cada fase de Codex. Para implementación, usa `00-contexto-general.md` junto con la fase específica.

## Objetivo

Crear desde cero un paquete npm:

```txt
@cofradiapartner/skills
```

Debe exponer una CLI para instalar skills reutilizables en proyectos locales, seleccionando agente de destino.

Uso esperado:

```bash
npx @cofradiapartner/skills
```

Binario interno:

```bash
create-skill
```

## Stack

```txt
TypeScript
ESM
Node.js moderno
npm y pnpm compatibles
tsup
commander
@clack/prompts
zod
fs-extra
picocolors
Vitest
Vitest coverage
Snapshots normalizados con Vitest
ESLint
Prettier
tsconfig strict
GitHub Actions
Changesets
```

## Reglas críticas

```txt
No usar monorepo.
No usar CommonJS.
No crear manifest.json.
No hacer detección automática de agente.
No implementar registry remoto en v0.1.
Todas las rutas destino se resuelven contra process.cwd().
Nunca se resuelven destinos contra la ruta interna del paquete instalado.
Distinguir siempre sourceSkillsDir de targetSkillsDir.
remove y update deben rechazar cualquier destino que resuelva dentro de sourceSkillsDir.
No sobrescribir archivos existentes sin decisión explícita.
--yes no autoriza operaciones destructivas por sí solo.
Si no se puede preguntar en modo no interactivo, fallar con error claro.
Los comandos inválidos deben devolver exit code distinto de cero.
Los snapshots deben normalizar rutas, cwd, versión exacta de Node y separadores.
```

## Agentes

```txt
claude
codex
opencode
cursor
windsurf
generic
```

Default:

```txt
claude
```

Rutas por defecto relativas a `process.cwd()`:

```txt
claude   → .claude/skills
codex    → .codex/skills
opencode → .opencode/skills
cursor   → .cursor/rules
windsurf → .windsurf/rules
generic  → skills
```

## Skill inicial

```txt
skills/skill-apple-ui/
├─ skill.md
├─ examples.md
└─ README.md
```

Metadata en frontmatter de `skill.md`:

```md
---
name: Apple UI
description: Skill para crear interfaces minimalistas, premium, limpias y responsivas inspiradas en sistemas de diseño tipo Apple.
---
```

## Orden de implementación corregido

```txt
0. Reglas permanentes
1. Bootstrap mínimo
2. Agentes y rutas
3. skill-apple-ui
4. Frontmatter + Zod + registry
5. CLI no destructiva: list, agents, validate, doctor
6. Install + conflictos + dry-run
7. Modo interactivo
8. Create/remove/update con protecciones
9. Errores, exit codes, cancelaciones y logging
10. Coverage, snapshots e integración
11. CI, release, Changesets y tooling
12. README, LICENSE y .gitignore
13. Validación final desde src, dist y escenario de publicación
14. Auditoría GPT-5.4
15. Corrección final Codex
```
