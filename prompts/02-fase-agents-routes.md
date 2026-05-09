# 02 — Fase agentes, tipos y rutas

## Modelo recomendado

```txt
GPT-5.3 Codex
```

## Contexto

Lee también:

```txt
00-contexto-general.md
```

## Objetivo

Implementar tipos base, agentes soportados, rutas por defecto y resolución de target contra `process.cwd()`.

## Archivos a crear/modificar

```txt
src/types/agent.ts
src/types/skill.ts
src/core/agents.ts
src/core/resolve-target-path.ts
tests/agents.test.ts
tests/resolve-target-path.test.ts
```

## Requisitos

Define:
- AgentId
- AgentDefinition
- Skill

Agentes:
- claude
- codex
- opencode
- cursor
- windsurf
- generic

Default: claude.

Rutas por defecto:
- claude → .claude/skills
- codex → .codex/skills
- opencode → .opencode/skills
- cursor → .cursor/rules
- windsurf → .windsurf/rules
- generic → skills

Todas las rutas se resuelven contra `process.cwd()` o un `projectRoot` inyectado en tests.

No resolver destinos contra la ruta del paquete instalado.

## Restricciones específicas

```txt
Ejecuta solo esta fase.
No avances a fases posteriores.
No documentes como funcional algo que todavía no implementas.
Mantén TypeScript strict.
Mantén ESM.
No uses CommonJS.
```

## Comandos de validación

```bash
npm run typecheck
npm run test
```

## Criterios de aceptación

- Rutas correctas.
- Ruta custom prevalece.
- Agent inválido falla.
- Tests cubren cwd/projectRoot.
- No hay detección automática de agente.
