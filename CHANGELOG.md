# @cofradiapartner/skills

## 1.0.8 - 2026-05-27

### Changed
- Actualiza `skill-apple-ui` a v2: detecta automáticamente el stack del proyecto (React, Vue, Astro, Next.js, vanilla) y genera componentes en el formato correcto del framework.
- Incorpora principios de código limpio (SRP, DRY, KISS, props tipadas, componentes pequeños, side effects separados).

## 1.0.7 - 2026-05-27

### Changed
- Actualiza `skill-apple-ui` a v2: detecta automáticamente el stack del proyecto (React, Vue, Astro, Next.js, vanilla) y genera componentes en el formato correcto del framework.
- Incorpora principios de código limpio (SRP, DRY, KISS, props tipadas, componentes pequeños, side effects separados).

### Added
- Agrega `gh-release` skill: prepara y publica proyectos en GitHub con version, tag annotated y changelog.
- Agrega `examples.md` y `README.md` a `astro-ts-tw-base` y `auto-testing` para cumplir con la validacion de skills.

### Fixed
- Corrige `SKILL.md` → `skill.md` (lowercase) en `astro-ts-tw-base` y `auto-testing` para que pasen validacion.
- Corrige tests de registry para reflejar el metadata actualizado de `skill-apple-ui`.
- Excluye `skills/` y `.opencode/` de la busqueda de tests en Vitest.

## 1.0.6 - 2026-05-27

### Added
- Agrega `astro-ts-tw-base` skill: inicializa proyecto Astro + TypeScript strict + Tailwind CSS con estructura profesional.
- Agrega `auto-testing` skill: toolkit para ejecutar tests automáticos en proyectos JS/TS (Vitest/Jest).
- Agrega assets y referencias a `skill-apple-ui` (temas CSS, plantillas, patrones de menú y hero).
- Documenta las 3 skills incluidas en el README con tabla de descripciones.

### Changed
- Reestructura `skill-apple-ui/skill.md` con metadatos YAML, pasos prácticos, ejemplos y assets referenciados.
- Simplifica `skill-apple-ui/examples.md` a 3 prompts esenciales en lugar de 13 ejemplos detallados.

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
