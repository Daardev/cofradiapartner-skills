# @cofradiapartner/skills

## 1.0.3 - 2026-05-10

### Added

- Agrega el comando `search` y soporte de busqueda por id, nombre y descripcion en el registro local de skills.
- Incorpora un documento interno en `docs/cli-operating-rules.md` para fijar las reglas operativas del CLI.

### Changed

- Simplifica el modelo de instalacion para operar siempre sobre `.agents/skills` en local y `~/.agents/skills` en global, con `--target` como prioridad maxima.
- Reestructura el flujo interactivo para volver al menu principal, permitir busqueda desde la UI y usar rutas/destinos acordes al comportamiento real del filesystem.
- Actualiza `doctor`, `README.md` y el contrato de comandos para reflejar el modelo unificado de destino.

### Removed

- Elimina el comando `agents` y la logica/tipos legacy por agente que ya no afectaban el destino real de instalacion.

## 1.0.0

### Major Changes

- f4bc136: Normalize skill install targets around `.agents/skills` and add `--global` for explicit installs in `~/.agents/skills`.

  This release changes the CLI path resolution behavior for `install`, `update`, and `remove`:
  - Local operations now default to `.agents/skills` relative to the current project root.
  - `--global` now targets `~/.agents/skills`.
  - `--agent` is preserved as metadata compatibility, but no longer changes the destination directory by itself.

  Also refresh the docs and command help to reflect the new target precedence and global workflow.
