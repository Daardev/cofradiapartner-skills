# Examples - NPM Release Pipeline

## Ejemplo 1 - Publicar primera version de una CLI

Valida este paquete npm scoped como CLI antes de publicarlo. Quiero que revises `package.json`, ejecutes typecheck, lint, test, coverage y build, inspecciones `npm pack`, pruebes `node dist/...` y me indiques si esta listo para publicar con `npm publish --access public`.

## Ejemplo 2 - Validar tarball y prueba externa

Empaqueta este proyecto con `npm pack` y verifica que el tarball solo incluya `dist`, `skills`, `assets`, `README.md`, `LICENSE` y `package.json`. Despues, pruebalo desde una carpeta temporal externa con `npx` o instalando el tarball.

## Ejemplo 3 - Release de mantenimiento

Tengo un cambio pequeno en un paquete CLI ya publicado. Quiero un checklist ordenado para `npm version patch`, validacion local completa, publicacion npm, prueba con `npx`, push a GitHub y creacion de tag.

## Ejemplo 4 - Publicacion con 2FA o token

Prepara este paquete para publicacion en npm. Si el registry exige 2FA, usa `--otp`. Si estoy usando token granular con bypass 2FA, dame el comando exacto y explica como confirmar que la publicacion quedo visible con `npm view` y `npx`.
