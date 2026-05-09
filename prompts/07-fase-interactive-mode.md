# 07 — Fase modo interactivo

## Modelo recomendado

```txt
GPT-5.3 Codex
```

## Contexto

Lee también:

```txt
00-contexto-general.md
```

## Objetivo

Implementar modo interactivo reutilizando servicios core ya probados, sin duplicar lógica.

## Archivos a crear/modificar

```txt
src/cli/interactive.ts
src/cli/program.ts
src/index.ts
```

## Requisitos

Cuando se ejecuta sin subcomando, abrir menú con @clack/prompts.

Flujo:
1. Seleccionar acción.
2. Instalar skill.
3. Seleccionar una o varias skills.
4. Opción todas las skills.
5. Seleccionar agente.
6. Mostrar ruta sugerida.
7. Permitir ruta personalizada.
8. Confirmar instalación.

El modo interactivo debe llamar los mismos servicios core que install/list/agents/validate/doctor.

No implementar remove/update aquí.
No duplicar lógica de instalación.

## Restricciones específicas

```txt
Ejecuta solo esta fase.
No avances a fases posteriores.
No documentes como funcional algo que todavía no implementas.
Mantén TypeScript strict.
Mantén ESM.
No uses CommonJS.
```

## Comandos de validación

```bash
npm run typecheck
npm run test
npm run build
```

## Criterios de aceptación

- Ejecutar sin subcomando abre flujo interactivo.
- Modo directo sigue funcionando.
- No hay duplicación de lógica core.
- Build pasa.
