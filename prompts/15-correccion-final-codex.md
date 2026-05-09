# 15 — Corrección final Codex

## Modelo recomendado

```txt
GPT-5.3 Codex
```

## Contexto

Lee:

```txt
00-contexto-general.md
14-auditoria-gpt-54.md
```

## Objetivo

Corregir únicamente problemas críticos y medios detectados en la auditoría.

## Prompt

```markdown
Corrige únicamente los problemas críticos y medios detectados por GPT-5.4.

No agregues nuevas features.
No cambies arquitectura salvo que sea estrictamente necesario.
No elimines tests.
No elimines soporte npm/pnpm.
No cambies el paquete `@cofradiapartner/skills`.
No cambies el binario `create-skill`.

Después ejecuta:

npm run typecheck
npm run lint
npm run test
npm run test:coverage
npm run build

Luego valida:

node dist/index.js list
node dist/index.js agents
node dist/index.js doctor
node dist/index.js install skill-apple-ui --agent claude --dry-run

Si algo falla, corrígelo.

Entrega:
- archivos modificados
- problemas corregidos
- comandos ejecutados
- resultado final
```
