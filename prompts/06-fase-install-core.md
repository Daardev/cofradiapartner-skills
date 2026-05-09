# 06 — Fase install, conflictos y dry-run

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

Implementar instalación de skills con conflictos, copias incrementales, dry-run y contrato no interactivo.

## Archivos a crear/modificar

```txt
src/core/install-skill.ts
src/cli/commands/install.ts
src/utils/fs.ts
src/utils/errors.ts
tests/install-skill.test.ts
tests/dry-run.test.ts
```

## Requisitos

Implementar `install`.

Flags:
- --agent
- --target
- --all
- --dry-run
- --yes

Reglas:
- install --all no acepta IDs posicionales.
- install sin IDs y sin --all falla.
- agent inválido devuelve exit code distinto de cero.
- Todas las rutas destino se resuelven contra process.cwd().
- --target relativo se resuelve contra process.cwd().
- Si existe destino y no se puede preguntar, fallar con error claro.
- --yes no autoriza overwrite destructivo.
- dry-run no escribe ni modifica archivos.

Conflictos:
- cancel
- overwrite
- copy

copy usa:
- skill-apple-ui-2
- skill-apple-ui-3

No usar `skill-apple-ui-copy`.

En modo no interactivo con conflicto, no prompt infinito; error claro salvo que se indique explícitamente una estrategia segura.

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
npm run build
npm run dev -- install skill-apple-ui --agent claude --dry-run
```

## Criterios de aceptación

- Install funciona con una skill.
- Install funciona con --all.
- Conflictos están definidos.
- Dry-run no tiene side effects.
- Rutas usan process.cwd().
- Tests de integración usan directorios temporales.
