# 05 — Fase CLI no destructiva

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

Crear base CLI y comandos no destructivos: list, agents, validate y doctor.

## Archivos a crear/modificar

```txt
src/cli/program.ts
src/cli/commands/list.ts
src/cli/commands/agents.ts
src/cli/commands/validate.ts
src/cli/commands/doctor.ts
src/utils/logger.ts
src/core/doctor.ts
tests/doctor.test.ts
```

## Requisitos

Implementar con commander:
- list
- agents
- validate
- doctor

`doctor` debe vivir como servicio core puro y el comando solo formatea salida.

`validate --all` no acepta ID posicional.
`validate` con skill inválida debe devolver exit code distinto de cero.

`doctor` debe revisar:
- versión de Node sin snapshotear versión exacta
- cwd normalizado
- permisos de escritura mediante comprobación temporal segura
- skills disponibles
- agentes soportados
- rutas sugeridas
- validación de skills incluidas

No implementar install todavía.
No documentar comandos destructivos como funcionales todavía.

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
npm run dev -- list
npm run dev -- agents
npm run dev -- validate skill-apple-ui
npm run dev -- doctor
```

## Criterios de aceptación

- CLI no destructiva funciona.
- validate devuelve exit code correcto.
- doctor no tiene checks frágiles.
- lógica core separada de CLI.
- Tests pasan.
