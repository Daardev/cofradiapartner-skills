---
name: auto-testing
description: Toolkit para ejecutar tests automáticos en proyectos JavaScript/TypeScript. Detecta el stack tecnológico, instala el framework de testing apropiado (Vitest o Jest), ejecuta los tests y genera un reporte JSON con resultados, errores y sugerencias.
---

# Auto Testing

Para ejecutar tests automáticos en proyectos JS/TS, usa esta skill que detecta el stack y configura el entorno de testing.

**Helper Scripts Disponibles**:
- `scripts/detect-stack.js` - Detecta el stack del proyecto
- `scripts/generate-log.js` - Genera el reporte JSON de resultados
- `scripts/generate-unit-tests.js` - Genera tests unitarios automáticamente

**Always run scripts with `--help` first** para ver uso. NO leas el source hasta queTry running the script first and find that a customized solution is absolutely necessary.

## Decision Tree: Choosing Your Testing Approach

```
User task → ¿Qué tipo de testing necesitas?
    │
    ├─ Tests unitarios → ¿El proyecto tiene funciones en src/utils o src/lib?
    │   ├─ Sí → Ejecutar: node scripts/generate-unit-tests.js
    │   │        Luego: npx vitest run
    │   │
    │   └─ No → Ir a testing de componentes o integración
    │
    ├─ Tests de componentes → ¿Qué framework UI?
    │   ├─ React → @testing-library/react
    │   ├─ Vue → @testing-library/vue
    │   ├─ Svelte → svelte-testing-library
    │   └─ Otros → Usar Vitest básico
    │
    └─ Tests E2E → Usar Playwright (skill separada)

¿Ya tienes Vitest/Jest configurado?
    ├─ Sí → npx vitest run (o npm test)
    │
    └─ No → Ejecutar paso 1 del flujo
```

## Flujo de Ejecución

### Paso 1: Detectar Stack
```bash
node scripts/detect-stack.js
```
Detector devuelve: `astro`, `next`, `react`, `vue`, `svelte`, `node`, o `vanilla`.

### Paso 2: Instalar Dependencias
```bash
# Vitest (recomendado para la mayoría)
npm install -D vitest @vitest/ui

# Si es React
npm install -D @testing-library/react

# Si es Vue
npm install -D @testing-library/vue

# Para coverage
npm install -D @vitest/coverage-v8
```

### Paso 3: Copiar Configuración
```bash
# Copiar desde assets/configs/
cp assets/configs/vitest.config.ts ./
```

### Paso 4: Ejecutar Tests
```bash
npm test
# o
npx vitest run
```

### Paso 5: Generar Reporte
```bash
# Generar test-results.json
node scripts/generate-log.js test-results.json vitest
```

## Ejemplo: Testing Automático Completo

```bash
# 1. Detectar stack
STACK=$(node scripts/detect-stack.js | jq -r '.stack')
echo "Stack detectado: $STACK"

# 2. Instalar dependencias según stack
if [ "$STACK" = "react" ]; then
  npm install -D vitest @testing-library/react @vitest/coverage-v8
elif [ "$STACK" = "vue" ]; then
  npm install -D vitest @testing-library/vue @vitest/coverage-v8
else
  npm install -D vitest @vitest/coverage-v8
fi

# 3. Copiar config
cp assets/configs/vitest.config.ts ./

# 4. Generar tests unitarios si no existen
if [ ! -d "tests" ]; then
  node scripts/generate-unit-tests.js src/utils tests/utils
fi

# 5. Ejecutar tests
npx vitest run --reporter=json --outputFile=test-results.json

# 6. Mostrar resultados
cat test-results.json | jq '.summary'
```

## Patrón: Unit Testing Automático

1. **Escanear funciones**:
   ```bash
   node scripts/generate-unit-tests.js src/utils tests/utils
   ```

2. **Ejecutar solo unit tests**:
   ```bash
   npx vitest run tests/utils
   ```

3. **Ver resultados**:
   ```bash
   cat test-results.json | jq '.unitTests'
   ```

## Errores Comunes

❌ **NO** ejecutar tests sin esperar a que termine la instalación de dependencias
✅ **SÍ** verificar que `node_modules/.bin/vitest` existe antes de ejecutar

❌ **NO** intentar testear componentes sin las librerías de testing apropiadas
✅ **SÍ** instalar `@testing-library/react` o equivalente según el framework

❌ **NO** generar tests unitarios en proyectos sin funciones exportadas
✅ **SÍ** verificar primero con `ls src/utils` o `ls src/lib`

## Mejores Prácticas

- **Usar scripts como black boxes** - Los scripts en `scripts/` manejan flujos complejos可靠的mente
- Usar `npx vitest run` para ejecución rápida
- Siempre generar `test-results.json` para auditorías
- Mantener las dependencias de testing en `devDependencies`
- Usar `--coverage` solo cuando sea necesario para no ralentizar

## Archivos de Referencia

- **assets/configs/** - Configuraciones:
  - `vitest.config.ts` - Configuración completa con coverage
  - `jest.config.js` - Alternativa para proyectos Jest

- **assets/component-tests/** - Ejemplos de tests de componentes:
  - `react/Button.tsx` + `Button.test.tsx`
  - `vue/MyButton.vue` + `MyButton.test.ts`

- **assets/templates/** - Plantillas:
  - `unit-test-example.ts` - Plantilla para tests unitarios

## Resultados

El archivo `test-results.json` generado contiene:
```json
{
  "timestamp": "2025-01-15T10:30:00Z",
  "stackDetected": "react",
  "framework": "vitest",
  "testsCreated": [...],
  "testsExecuted": [...],
  "summary": {"total": 10, "passed": 8, "failed": 2},
  "errors": [...],
  "suggestions": [...]
}
```