# 12 — Fase README, LICENSE y .gitignore

## Modelo recomendado

```txt
GPT-5.4 para revisar / GPT-5.3 Codex para editar
```

## Contexto

Lee también:

```txt
00-contexto-general.md
```

## Objetivo

Crear documentación final solo cuando los comandos ya están implementados.

## Archivos a crear/modificar

```txt
README.md
LICENSE
.gitignore
```

## Requisitos

README debe documentar solo features realmente implementadas.

Debe incluir:
- nombre del proyecto
- descripción
- instalación
- uso con npx
- uso global
- comandos disponibles
- ejemplos
- agentes soportados
- rutas por defecto
- process.cwd() como base de targets
- diferencia sourceSkillsDir vs targetSkillsDir
- protecciones remove/update
- install una skill
- install varias skills
- install --all
- --dry-run
- --target
- validate
- create scaffold
- remove/update
- doctor
- tests
- build
- publicación npm
- agregar nuevas skills
- agregar nuevos agentes

LICENSE MIT.

.gitignore para Node/TypeScript.

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

- README coincide con comportamiento real.
- No documenta features futuras como funcionales.
- LICENSE y .gitignore completos.
