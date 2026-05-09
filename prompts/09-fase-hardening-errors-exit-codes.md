# 09 — Fase hardening de errores, exit codes y logging

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

Endurecer errores, cancelaciones, validaciones CLI, logging y exit codes.

## Archivos a crear/modificar

```txt
src/utils/errors.ts
src/utils/logger.ts
src/cli/program.ts
src/cli/commands/*.ts
tests/cli-contract.test.ts
tests/errors.test.ts
```

## Requisitos

Asegurar:
- install --all + IDs posicionales falla
- validate --all + ID posicional falla
- install sin IDs y sin --all falla
- agent inválido falla con exit code no cero
- validate inválido falla con exit code no cero
- skill inexistente falla con exit code no cero
- cancelación del usuario no muestra stack trace
- stack trace solo en modo debug
- mensajes de error claros

No agregar features nuevas.

Normalizar errores para que los tests sean estables.

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
```

## Criterios de aceptación

- Contrato CLI está cubierto por tests.
- Errores devuelven exit code correcto.
- No hay stack trace innecesario.
- Logging es consistente.
