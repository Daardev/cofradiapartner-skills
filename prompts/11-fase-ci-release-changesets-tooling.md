# 11 — Fase CI, release, Changesets y tooling

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

Configurar CI, release, Changesets y cierre de calidad de tooling.

## Archivos a crear/modificar

```txt
.github/workflows/ci.yml
.github/workflows/release.yml
.changeset/
package.json
eslint.config.js
prettier.config.cjs
```

## Requisitos

CI:
- push
- pull_request
- Node moderno
- npm ci
- npm run typecheck
- npm run lint
- npm run test
- npm run build

Compatibilidad pnpm:
- agregar script o documentación de prueba pnpm
- opcional: matriz CI npm/pnpm si no complica

Release:
- preparar Changesets
- usar NPM_TOKEN como secret
- no inventar tokens

ESLint/Prettier:
- completar configuración funcional si quedó mínima
- asegurar scripts lint y format:check

prepublishOnly:
- typecheck
- lint
- test
- build

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
npm run lint
npm run test
npm run build
```

## Criterios de aceptación

- CI funcional.
- Release preparado.
- Changesets configurado.
- Tooling final pasa.
