# 13 — Fase validación final desde src, dist y escenario de publicación

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

Validar el proyecto completo desde código fuente, build dist y escenario cercano a publicación.

## Archivos a crear/modificar

```txt
package.json
dist/
tests/
README.md
```

## Requisitos

Ejecutar validaciones finales:
- typecheck
- lint
- test
- coverage
- build
- comandos desde npm run dev
- comandos desde node dist/index.js

Verificar:
- package name correcto
- bin correcto
- files incluye dist, skills, README.md, LICENSE
- prepublishOnly correcto
- dist ejecutable
- skill-apple-ui incluida

No agregar features nuevas.

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
npm run test:coverage
npm run build
node dist/index.js list
node dist/index.js agents
node dist/index.js doctor
node dist/index.js install skill-apple-ui --agent claude --dry-run
```

## Criterios de aceptación

- Proyecto listo para publicación.
- Comandos desde dist funcionan.
- No quedan errores conocidos.
- README coincide con CLI.
