# 08 — Fase create, remove y update con protecciones

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

Implementar create, remove y update con protecciones estrictas para no tocar skills fuente.

## Archivos a crear/modificar

```txt
src/cli/commands/create.ts
src/cli/commands/remove.ts
src/cli/commands/update.ts
src/core/create-skill-scaffold.ts
src/core/remove-installed-skill.ts
src/core/update-installed-skill.ts
tests/create-skill.test.ts
tests/remove-update.test.ts
```

## Requisitos

create:
- crea scaffold local en `./<nombre-skill>/`
- si carpeta existe, pregunta o falla
- no registra la skill en el paquete
- no escribe dentro de `skills/` fuente salvo que el usuario entregue target explícito y seguro
- no publica nada

remove:
- elimina solo skills instaladas en target del usuario
- nunca elimina sourceSkillsDir
- si target resuelve dentro de sourceSkillsDir, rechazar
- soporta --agent, --target, --yes, --dry-run

update:
- toma source desde sourceSkillsDir
- actualiza instalación en targetSkillsDir
- si target resuelve dentro de sourceSkillsDir, rechazar
- si no existe instalada, sugerir install
- soporta --agent, --target, --dry-run

Caso delicado:
generic usa target por defecto `skills`, pero debe resolverse contra process.cwd().
Aun así, si el cwd es el paquete y el target coincide con sourceSkillsDir, remove/update deben rechazar.

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

- create genera scaffold local.
- remove/update no tocan sourceSkillsDir.
- generic tiene guardia fuerte.
- dry-run no modifica.
- Tests cubren colisión con skills fuente.
