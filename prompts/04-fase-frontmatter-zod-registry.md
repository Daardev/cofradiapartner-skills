# 04 — Fase frontmatter, Zod, LocalSkillSource y registry

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

Implementar parser de frontmatter, schema Zod, validación, LocalSkillSource y registry local.

## Archivos a crear/modificar

```txt
src/schemas/skill.schema.ts
src/core/validate-skill.ts
src/core/skill-source.ts
src/core/registry.ts
tests/validate-skill.test.ts
tests/registry.test.ts
```

## Requisitos

Implementar parser simple de frontmatter YAML o solución interna robusta sin sobreingeniería.

Validar:
- existe carpeta
- existe skill.md
- existe examples.md
- existe README.md
- frontmatter válido
- name obligatorio no vacío
- description obligatorio no vacío

Crear interfaz:

```ts
export interface SkillSource {
  list(): Promise<Skill[]>;
  get(skillId: string): Promise<Skill>;
}
```

Implementar `LocalSkillSource`.

Distinguir explícitamente `sourceSkillsDir`.

No implementar descargas remotas.

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
```

## Criterios de aceptación

- Registry lista skill-apple-ui.
- Metadata se extrae desde skill.md.
- zod valida metadata.
- Skill inválida produce error controlado.
- Tests cubren casos válidos e inválidos.
