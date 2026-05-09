# 10 — Fase coverage, snapshots e integración

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

Completar coverage, snapshots normalizados y pruebas de integración más estrictas.

## Archivos a crear/modificar

```txt
vitest.config.ts
tests/*.test.ts
tests/helpers/*.ts
```

## Requisitos

Configurar coverage V8.

Excluir:
- dist
- node_modules
- tests
- coverage

Incluir:
- src/**/*.ts

Snapshots:
- snapshotear resúmenes normalizados
- normalizar cwd
- normalizar rutas temporales
- normalizar versión exacta de Node
- normalizar separadores Windows/Linux

Tests integración:
- install en todas las rutas de agentes
- target custom relativo a cwd
- dry-run sin side effects
- remove/update rechazando sourceSkillsDir
- validate --all con falla devuelve error
- doctor con output estable

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
npm run test
npm run test:coverage
npm run typecheck
```

## Criterios de aceptación

- Coverage funciona.
- Snapshots son estables.
- Tests no dependen de cwd real del usuario.
- Tests no usan rutas absolutas inestables.
