# @cofradiapartner/skills

## 1.0.0

### Major Changes

- f4bc136: Normalize skill install targets around `.agents/skills` and add `--global` for explicit installs in `~/.agents/skills`.

  This release changes the CLI path resolution behavior for `install`, `update`, and `remove`:
  - Local operations now default to `.agents/skills` relative to the current project root.
  - `--global` now targets `~/.agents/skills`.
  - `--agent` is preserved as metadata compatibility, but no longer changes the destination directory by itself.

  Also refresh the docs and command help to reflect the new target precedence and global workflow.
