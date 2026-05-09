
# Lista de prompts, modelos y orden de ejecución — v3

| Orden | Archivo | Modelo recomendado | Acción |
|---:|---|---|---|
| 0 | `00-contexto-general.md` | GPT-5.4 / GPT-5.3 Codex | Reglas permanentes. |
| 1 | `01-fase-bootstrap-minimo.md` | GPT-5.3 Codex | Bootstrap mínimo. |
| 2 | `02-fase-agents-routes.md` | GPT-5.3 Codex | Agentes, tipos y rutas. |
| 3 | `03-fase-skill-apple-ui.md` | GPT-5.3 Codex | Skill inicial. |
| 4 | `04-fase-frontmatter-zod-registry.md` | GPT-5.3 Codex | Frontmatter, Zod, registry. |
| 5 | `05-fase-cli-no-destructiva.md` | GPT-5.3 Codex | CLI no destructiva. |
| 6 | `06-fase-install-core.md` | GPT-5.3 Codex | Install, conflictos, dry-run. |
| 7 | `07-fase-interactive-mode.md` | GPT-5.3 Codex | Modo interactivo. |
| 8 | `08-fase-create-remove-update.md` | GPT-5.3 Codex | Create/remove/update protegidos. |
| 9 | `09-fase-hardening-errors-exit-codes.md` | GPT-5.3 Codex | Hardening de errores y exit codes. |
| 10 | `10-fase-coverage-snapshots-integration.md` | GPT-5.3 Codex | Coverage, snapshots, integración. |
| 11 | `11-fase-ci-release-changesets-tooling.md` | GPT-5.3 Codex | CI, release, Changesets. |
| 12 | `12-fase-readme-license-gitignore.md` | GPT-5.4 / GPT-5.3 Codex | Documentación final. |
| 13 | `13-fase-validacion-final.md` | GPT-5.3 Codex | Validación final. |
| 14 | `14-auditoria-gpt-54.md` | GPT-5.4 | Auditoría final. |
| 15 | `15-correccion-final-codex.md` | GPT-5.3 Codex | Corrección final. |
| Ref | `prompt-maestro-v3.md` | GPT-5.4 | Referencia completa. |
| Ref | `README.md` | No requiere modelo | Guía del paquete de prompts. |

## Patrón Codex

```markdown
Lee:

- prompts/00-contexto-general.md
- prompts/XX-fase-nombre.md

Ejecuta únicamente esta fase.
No avances a fases posteriores.
No agregues features fuera de esta fase.
Ejecuta los comandos de validación.
Corrige errores.
Detente.
```
