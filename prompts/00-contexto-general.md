# 00 — Contexto general y reglas permanentes

## Modelo recomendado

```txt
GPT-5.4 para revisión.
GPT-5.3 Codex como contexto para cada fase ejecutable.
```

## Proyecto

```txt
Paquete: @cofradiapartner/skills
Binario: create-skill
Uso: npx @cofradiapartner/skills
```

## Regla de fase

```txt
Ejecuta únicamente la fase indicada.
No avances a fases posteriores.
No agregues features futuras fuera de la fase.
Si una funcionalidad pertenece a otra fase, déjala sin implementar y no la documentes como funcional.
```

## Stack obligatorio

```txt
TypeScript
ESM
Node.js moderno
npm y pnpm compatibles
tsup
commander
@clack/prompts
zod
fs-extra
picocolors
Vitest
Vitest coverage
Snapshots normalizados
ESLint
Prettier
tsconfig strict
GitHub Actions
Changesets
```

## Dependencias runtime

```txt
commander
@clack/prompts
zod
fs-extra
picocolors
```

## Dependencias dev

```txt
typescript
tsx
tsup
vitest
@vitest/coverage-v8
eslint
prettier
changesets
@types/node
@types/fs-extra
```

## Reglas de arquitectura

```txt
No usar CommonJS.
No usar monorepo.
No crear manifest.json.
No hacer detección automática de agente.
No implementar registry remoto en v0.1.
No usar README como fuente adelantada de features.
No dejar comandos stub expuestos como funcionales.
No agregar dependencias extra para frontmatter salvo justificación fuerte.
Separar lógica core de comandos CLI.
Los comandos CLI solo formatean salida y llaman servicios core.
interactive.ts debe reutilizar servicios core; no duplicar lógica.
```

## Reglas de rutas

```txt
Todas las rutas destino, tanto por defecto como personalizadas, se resuelven contra process.cwd().
Nunca resolver destinos contra la ruta interna del paquete instalado.
Distinguir siempre:
- sourceSkillsDir: carpeta interna del paquete con las skills fuente.
- targetSkillsDir: carpeta destino dentro del proyecto del usuario.
```

## Protección contra operaciones destructivas

```txt
remove y update deben rechazar cualquier target que resuelva dentro de sourceSkillsDir.
remove nunca elimina skills fuente del paquete.
update nunca reemplaza skills fuente del paquete.
--yes no autoriza overwrite/delete destructivo automáticamente.
Si existe conflicto y no se puede preguntar, fallar con error claro.
Si hay --yes y el caso es destructivo, fallar con error claro y pedir opción explícita.
```

## Agentes

```txt
claude
codex
opencode
cursor
windsurf
generic
```

Default:

```txt
claude
```

Rutas por defecto, relativas a `process.cwd()`:

```txt
claude   → .claude/skills
codex    → .codex/skills
opencode → .opencode/skills
cursor   → .cursor/rules
windsurf → .windsurf/rules
generic  → skills
```

## Contrato CLI

```txt
install --all no acepta IDs posicionales.
validate --all no acepta ID posicional.
install sin IDs y sin --all falla.
agent inválido devuelve exit code no cero.
validate con skill inválida devuelve exit code no cero.
skill inexistente devuelve exit code no cero.
cancelación del usuario no debe mostrar stack trace.
```

## Snapshots

```txt
Snapshotear solo resúmenes normalizados.
Normalizar:
- process.cwd()
- rutas temporales
- versión exacta de Node
- separadores Windows/Linux
No snapshotear texto inestable completo de doctor sin normalización.
```
