# Reglas operativas del CLI

Este documento resume las reglas estables de comportamiento del CLI para evitar ambiguedades entre la UX, la documentacion y la implementacion.

## Modelo de destino

- La ruta local canonica para instalar skills es `.agents/skills`.
- La ruta global canonica para instalar skills es `~/.agents/skills`.
- El CLI opera sobre una carpeta unificada por proyecto, no sobre carpetas separadas por tipo de agente.

## Precedencia de resolucion

La resolucion de destino sigue este orden:

1. `--target`
2. `--global`
3. `.agents/skills` relativo a `process.cwd()`

## Alcance de los comandos

- `install`, `remove` y `update` comparten la misma resolucion de destino.
- `doctor` debe reportar la ruta consolidada como destino local por defecto.
- El modo interactivo no debe pedir elecciones que no cambian el resultado real del filesystem.
- La navegacion interactiva debe usar opciones explicitas de `Volver` en cada paso.
- `Esc` no es un mecanismo oficial de navegacion del producto.
- `Ctrl+C` es la salida inmediata global de la sesion interactiva.
- En seleccion multiple de skills, la interaccion esperada es `[espacio] para seleccionar`.

## Guardas de seguridad

- `sourceSkillsDir` es la fuente interna del paquete y no debe usarse como destino editable.
- `remove` y `update` no deben operar sobre rutas que resuelvan dentro de `sourceSkillsDir`.
- `--dry-run` no modifica archivos y debe reflejar el destino resuelto real.

## Implicancias de producto

- La experiencia principal del producto es una carpeta unificada de skills por proyecto.
- La documentacion, los mensajes del CLI y el modo interactivo deben reforzar ese modelo para no inducir errores de uso.
