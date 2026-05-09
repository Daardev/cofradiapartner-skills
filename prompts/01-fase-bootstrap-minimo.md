# 01 — Fase bootstrap mínimo

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

Crear el bootstrap real mínimo del proyecto: configuración base, estructura inicial, tooling básico y build inicial. No configurar CI funcional ni release todavía.

## Archivos a crear/modificar

```txt
package.json
tsconfig.json
tsup.config.ts
vitest.config.ts
eslint.config.js
prettier.config.cjs
src/index.ts
src/
tests/
skills/
.gitignore mínimo
LICENSE placeholder o MIT básico
```

## Requisitos

Crea `package.json` con:
- name: `@cofradiapartner/skills`
- type: `module`
- bin: `create-skill` apuntando a `./dist/index.js`
- scripts base: dev, build, test, test:watch, test:coverage, lint, format, format:check, typecheck, prepublishOnly

ESLint y Prettier deben quedar mínimamente operativos desde esta fase.

No crear workflows funcionales de GitHub Actions todavía.
No crear Changesets funcional todavía.
Puede crear carpetas placeholder si ayuda, pero la configuración funcional queda para la fase 11.

`src/index.ts` debe tener shebang:

```ts
#!/usr/bin/env node
```

Configurar tsup para ESM, target Node moderno, dts, sourcemap, clean y sin splitting.

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
npm run build
```

## Criterios de aceptación

- El proyecto instala dependencias.
- TypeScript strict está activo.
- Build genera `dist`.
- Lint pasa con configuración mínima.
- No hay CI/release funcional todavía.
