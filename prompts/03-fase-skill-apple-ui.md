# 03 — Fase skill inicial Apple UI

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

Crear la skill inicial `skill-apple-ui` como carpeta completa, sin registrar aún lógica avanzada.

## Archivos a crear/modificar

```txt
skills/skill-apple-ui/skill.md
skills/skill-apple-ui/examples.md
skills/skill-apple-ui/README.md
```

## Requisitos

Crear `skill-apple-ui` con metadata en frontmatter de `skill.md`.

No crear `manifest.json`.

La skill debe orientar a crear interfaces:
- jerarquía visual clara
- espaciado amplio
- tipografía limpia
- grillas responsivas
- cards suaves
- bordes redondeados
- microinteracciones
- fondos neutros
- contraste correcto
- composición premium
- diseño mobile-first

Puede tener inspiración Apple-like, pero sin copiar marca, textos protegidos, componentes propietarios ni identidad visual exacta de Apple.

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
```

## Criterios de aceptación

- Existe skill-apple-ui.
- Tiene skill.md, examples.md y README.md.
- Metadata está en skill.md.
- No existe manifest.json.
