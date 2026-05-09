# Prompts por fase v3 — `@cofradiapartner/skills`

Esta versión corrige los riesgos detectados en la auditoría técnica:

- Separación entre bootstrap, core, CLI, instalación, comandos destructivos, hardening, CI y documentación.
- Rutas siempre relativas a `process.cwd()`.
- Protección explícita de la carpeta fuente `skills/` del paquete.
- Contrato no interactivo para conflictos.
- Exit codes definidos para errores CLI.
- Snapshots normalizados para evitar fragilidad.
- Separación entre `sourceSkillsDir` y `targetSkillsDir`.
- README/documentación funcional al final, cuando los comandos ya existen.

## Estrategia de modelos

- **GPT-5.4**: arquitectura, revisión, auditoría, documentación técnica y decisiones de diseño.
- **GPT-5.3 Codex**: implementación real dentro del repositorio, edición de archivos, tests, build y correcciones.

## Orden de ejecución

| Orden | Archivo | Modelo recomendado | Uso |
|---:|---|---|---|
| 0 | `00-contexto-general.md` | GPT-5.4 para revisar / GPT-5.3 Codex como contexto | Reglas activas permanentes. |
| 1 | `01-fase-bootstrap-minimo.md` | GPT-5.3 Codex | Bootstrap real mínimo. |
| 2 | `02-fase-agents-routes.md` | GPT-5.3 Codex | Tipos, agentes y rutas. |
| 3 | `03-fase-skill-apple-ui.md` | GPT-5.3 Codex | Skill inicial. |
| 4 | `04-fase-frontmatter-zod-registry.md` | GPT-5.3 Codex | Parser, Zod, LocalSkillSource, registry y validación. |
| 5 | `05-fase-cli-no-destructiva.md` | GPT-5.3 Codex | CLI base: list, agents, validate, doctor. |
| 6 | `06-fase-install-core.md` | GPT-5.3 Codex | Install, conflictos, copias incrementales y dry-run. |
| 7 | `07-fase-interactive-mode.md` | GPT-5.3 Codex | Modo interactivo reutilizando core. |
| 8 | `08-fase-create-remove-update.md` | GPT-5.3 Codex | Create/remove/update con protecciones. |
| 9 | `09-fase-hardening-errors-exit-codes.md` | GPT-5.3 Codex | Errores, exit codes, cancelaciones y logging. |
| 10 | `10-fase-coverage-snapshots-integration.md` | GPT-5.3 Codex | Coverage, snapshots e integración. |
| 11 | `11-fase-ci-release-changesets-tooling.md` | GPT-5.3 Codex | CI, release, Changesets y tooling final. |
| 12 | `12-fase-readme-license-gitignore.md` | GPT-5.4 para revisar / GPT-5.3 Codex para editar | README, LICENSE y .gitignore. |
| 13 | `13-fase-validacion-final.md` | GPT-5.3 Codex | Validación final desde src, dist y escenario de publicación. |
| 14 | `14-auditoria-gpt-54.md` | GPT-5.4 | Auditoría final sin modificar código. |
| 15 | `15-correccion-final-codex.md` | GPT-5.3 Codex | Corrección final de problemas críticos y medios. |

## Patrón de uso con Codex

```markdown
Lee estos archivos:

- prompts/00-contexto-general.md
- prompts/XX-fase-nombre.md

Ejecuta únicamente esta fase.
No avances a fases posteriores.
No agregues features fuera de esta fase.
Al finalizar, ejecuta los comandos de validación indicados.
Corrige errores si aparecen.
Detente y espera la siguiente fase.
```
