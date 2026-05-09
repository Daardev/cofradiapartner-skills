---
name: NPM Release Pipeline
description: Skill para validar, empaquetar, publicar y probar paquetes CLI en npm y GitHub de forma ordenada.
---

# NPM Release Pipeline

Usa esta skill cuando necesites preparar un paquete npm para publicacion, validar su contenido real y comprobar que la CLI funciona antes y despues del release.

## Objetivo

- Confirmar que estas en la raiz del paquete correcto.
- Revisar `package.json` antes de publicar.
- Ejecutar checks tecnicos antes de `npm publish`.
- Inspeccionar el contenido real de `npm pack`.
- Probar el paquete en una carpeta externa.
- Validar el build desde `dist/`.
- Publicar a npm con `--access public` si el paquete es scoped.
- Preparar push, tag y release en GitHub.

## Checklist

### 1. Confirmar contexto

- Verificar que existe `package.json` en la raiz.
- Confirmar nombre, version, `bin`, `files` y `prepublishOnly`.
- Si el paquete es CLI, comprobar que el binario apunta al archivo correcto dentro de `dist/`.

### 2. Ejecutar checks tecnicos

No publiques si falla alguno de estos comandos:

```bash
npm run typecheck
npm run lint
npm run test
npm run test:coverage
npm run build
```

Si cambias TypeScript, ejecuta `build` siempre.
Si solo cambias README o assets, `build` puede no ser obligatorio, pero conviene revisar `npm pack`.

### 3. Validar la CLI compilada

```bash
node dist/index.js list
node dist/index.js agents
node dist/index.js doctor
node dist/index.js install skill-apple-ui --agent claude --dry-run
```

### 4. Revisar el tarball

```bash
npm pack
```

Comprueba que incluya solo lo necesario:

- `dist/`
- `skills/`
- `assets/`
- `README.md`
- `LICENSE`
- `package.json`

No debe incluir:

- `src/`
- `tests/`
- `.env`
- `.opencode/`
- `node_modules/`
- archivos de otro proyecto

### 5. Probar fuera del repo

- Crear una carpeta temporal externa.
- Instalar o ejecutar el tarball ahi.
- Confirmar que el paquete no depende del cwd del repo fuente.

Ejemplo:

```bash
npm pack
mkdir ..\tmp-cli-test
cd ..\tmp-cli-test
npm init -y
npx "C:\ruta\al\cofradiapartner-skills-0.1.0.tgz" list
```

### 6. Publicar en npm

Si el paquete es scoped:

```bash
npm publish --access public
```

Si npm exige 2FA:

```bash
npm publish --access public --otp <CODIGO>
```

Si usas token granular con bypass 2FA:

```bash
npm publish --access public --//registry.npmjs.org/:_authToken=TU_TOKEN
```

### 7. Validar post-publicacion

```bash
npm view <paquete> version
npx <paquete> list
```

### 8. Publicar en GitHub

```bash
git status
git add .
git commit -m "chore: release vX.Y.Z"
git branch -M main
git remote add origin <url>
git push -u origin main
git tag vX.Y.Z
git push origin vX.Y.Z
```

## Reglas operativas

- No publicar si `typecheck`, `lint`, `test` o `build` fallan.
- Revisar siempre `npm pack` antes de publicar.
- Probar siempre el paquete fuera del repo.
- Despues de publicar, probar con `npx`.
- Si hay cambios pequeños, usar `npm version patch`.
- Si hay nuevas funcionalidades, usar `npm version minor`.
- Si hay cambios incompatibles, usar `npm version major`.
