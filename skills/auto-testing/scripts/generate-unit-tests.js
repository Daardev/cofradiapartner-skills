const fs = require('fs');
const path = require('path');

/**
 * Escanea las carpetas de utilidades y genera tests unitarios automáticamente.
 * Uso: node scripts/generate-unit-tests.js <carpeta-src> <carpeta-tests>
 *
 * Ejemplo:
 *   node scripts/generate-unit-tests.js src/utils tests/utils
 */
const srcDir = process.argv[2] || path.join(process.cwd(), 'src', 'utils');
const testDir = process.argv[3] || path.join(process.cwd(), 'tests', 'utils');

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let result = [];
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      result = result.concat(getFiles(fullPath));
    } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.js'))) {
      result.push(fullPath);
    }
  }
  return result;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateTestFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const name = path.basename(filePath, path.extname(filePath));
  // Buscar funciones exportadas (simple regex para detectar export function/name)
  const exports = [];
  const exportMatches = content.matchAll(/export\s+(?:function\s+|const\s+|let\s+)([a-zA-Z_$][a-zA-Z0-9_$]*)/g);
  for (const match of exportMatches) {
    exports.push(match[1]);
  }

  if (exports.length === 0) return null;

  let testContent = `import { describe, it, expect } from 'vitest';\n\n`;
  testContent += `describe('${name}', () => {\n`;

  for (const fn of exports) {
    testContent += `\n  it('debería retornar el resultado esperado', () => {\n`;
    testContent += `    // TODO: Implementar test para ${fn}\n`;
    testContent += `    // expect(${fn}(input)).toBe(expected);\n`;
    testContent += `  });\n`;

    testContent += `\n  it('debería manejar casos límite', () => {\n`;
    testContent += `    // TODO: Agregar casos como null, undefined, vacío\n`;
    testContent += `  });\n`;

    testContent += `\n  it('debería lanzar error con entrada inválida', () => {\n`;
    testContent += `    // TODO: Agregar expect(() => ${fn}(invalid)).toThrow()\n`;
    testContent += `  });\n`;
  }

  testContent += `});\n`;

  return testContent;
}

// Obtener archivos fuente
const srcFiles = getFiles(srcDir);
console.log('Archivos fuente encontrados:', srcFiles.length);

// Crear carpeta de tests si no existe
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
  console.log('Carpeta de tests creada:', testDir);
}

// Generar tests para cada archivo
let generatedCount = 0;
for (const file of srcFiles) {
  const testFileName = path.basename(file, path.extname(file)) + '.test.ts';
  const testFilePath = path.join(testDir, testFileName);

  // Si ya existe el test, no sobreescribir
  if (fs.existsSync(testFilePath)) {
    console.log('Test ya existe, saltando:', testFileName);
    continue;
  }

  const testContent = generateTestFromFile(file);
  if (testContent) {
    fs.writeFileSync(testFilePath, testContent, 'utf-8');
    console.log('Test generado:', testFileName);
    generatedCount++;
  }
}

console.log(`\nTotal de tests generados: ${generatedCount}`);