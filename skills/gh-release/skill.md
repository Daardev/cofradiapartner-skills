---
name: gh-release
description: Prepare and publish projects to GitHub with release discipline. Use when pushing a project, creating a repository release, publishing a new version, or preparing a delivery that must include a version, a Git tag, and a changelog/history of changes.
---

# Gh Release

## Overview

Use this skill whenever a project is going to be published or updated on GitHub. The default expectation is to determine the next version, prepare the changelog/history of changes, create the matching Git tag, and push the repository update to GitHub.

Treat this as a release workflow, not as a plain push workflow.

## Release Rules

Before publishing, always ensure these three items exist:

- a version
- a Git tag that matches that version
- a changelog or clear history of changes made

Do not publish a release-quality update without all three.

## Default Behavior

When this skill is invoked, assume the user wants the full publish flow unless they explicitly narrow the scope.

Default responsibilities:

- inspect current changes and repository state
- determine or propose the next version
- ensure the project stores that version where appropriate
- prepare a changelog or release notes entry
- create the Git commit if needed for release metadata
- create the Git tag
- push branch and tag to GitHub

Only skip one of these steps if:

- the user explicitly says not to do it
- the repository already has that step completed
- the current task is clearly a partial release-prep request

## Default Decisions

If the repository does not already define these conventions, use these defaults:

- initial version: `v0.1.0`
- version format: semantic versioning with `v` prefix
- changelog file: `CHANGELOG.md`
- tag type: annotated tag
- release commit message: `release: vX.Y.Z`
- tag message: `Release vX.Y.Z`

If the repository already uses another convention, follow the repository instead of these defaults.

## Standard Workflow

Follow this order:

1. Review the working tree and summarize the actual changes.
2. Confirm or determine the next version.
3. Update the project version in the appropriate source file if the project stores one.
4. Prepare a changelog entry or release notes based on the real changes.
5. Create or update `CHANGELOG.md` if the repository does not already keep release history somewhere else.
6. Commit the version/changelog updates if needed.
7. Create an annotated Git tag for that version.
8. Push the branch and the tag to GitHub.
9. If requested, create the GitHub release using the changelog text as release notes.

## Versioning Guidance

Prefer semantic versioning unless the project already uses another convention.

Use:

- patch version for fixes, documentation updates, and non-breaking polish
- minor version for backward-compatible features
- major version for breaking changes

If the repository already has tags, continue the existing pattern.
If there are no tags yet, start from `v0.1.0` by default.
Only jump to `v1.0.0` if the user explicitly says the project is production-ready and wants a stable first major release.

When unsure between patch and minor:

- choose patch for fixes and small polish
- choose minor for new visible functionality

Do not invent a major version without a clear breaking change or explicit user request.

## Tag Rules

Prefer annotated tags, not lightweight tags.

Recommended format:

```text
v1.2.3
```

If the repository already uses tags without `v`, preserve the existing convention.

The tag must match the release version exactly.

## Changelog Rules

The changelog must reflect actual work done, not generic filler.

At minimum, include:

- version
- date if the project uses dated entries
- concise summary of what changed

Prefer grouped notes such as:

- Added
- Changed
- Fixed

If the project does not yet have a changelog file, create `CHANGELOG.md` by default.
If the user only wants a GitHub release entry and explicitly does not want files changed, use the release notes body instead.

Preferred changelog structure:

```text
## vX.Y.Z - YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...
```

Only include sections that actually contain changes.

## Commit Guidance

If release metadata needs its own commit, prefer:

```text
release: vX.Y.Z
```

If the release is part of the current working changes and a single commit is more appropriate, make sure the final commit message still makes the release intent obvious.

## What To Check Before Pushing

Before final publish, verify:

- the repo is on the intended branch
- there are no accidental local-only files
- version and tag match exactly
- changelog text matches the actual diff
- the tag points at the intended commit
- the pushed repository contains the release commit if one was created
- the remote has received both the branch update and the tag

## GitHub CLI Guidance

When using `gh`, prefer a sequence like:

- create or confirm repo
- push branch
- push tag
- create release if needed

If a GitHub release is created, use the prepared changelog text instead of auto-generated notes unless the user explicitly wants autogenerated notes.

When the repository does not exist yet, create it first, then publish the release workflow on top of that repository.

## Minimal Invocation Expectation

If the user says something short like:

- "Usa $gh-release"
- "Publica este proyecto"
- "Subelo a GitHub"

assume the task includes:

- choose or confirm next version
- update release history
- create tag
- push to GitHub

Do not wait for the user to repeat those steps individually unless a risky ambiguity remains.

## Typical Requests This Skill Should Handle

- "Sube este proyecto a GitHub con version y tag"
- "Publica una nueva version"
- "Crea un release privado con changelog"
- "Prepara el repo para entregar al cliente"
- "Haz push, tag y release"

## Project Discipline

When this skill is used, treat version, tag, and changelog as required release artifacts, not optional extras.
