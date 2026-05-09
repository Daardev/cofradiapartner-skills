# 14 — Auditoría final GPT-5.4

## Modelo recomendado

```txt
GPT-5.4
```

## Objetivo

Auditar el proyecto completo sin modificar código.

## Prompt

```markdown
Revisa el proyecto `@cofradiapartner/skills`.

No modifiques código.

Evalúa:

1. Arquitectura.
2. Separación entre core y CLI.
3. Consistencia README vs comportamiento real.
4. Contrato de rutas process.cwd().
5. Separación sourceSkillsDir vs targetSkillsDir.
6. Protecciones remove/update.
7. Contrato no interactivo de conflictos.
8. Exit codes.
9. Tests reales vs tests decorativos.
10. Snapshots normalizados.
11. Publicación npm.
12. CI y Changesets.
13. Compatibilidad npm/pnpm.

Entrega problemas priorizados:

## Críticos
Bloquean uso real, tests, build, publicación o pueden borrar archivos fuente.

## Medios
Afectan DX, mantenibilidad, consistencia o cobertura.

## Menores
Mejoras no bloqueantes.

Para cada problema:
- archivo
- descripción
- impacto
- solución recomendada
```
