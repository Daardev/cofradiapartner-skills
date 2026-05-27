const fs = require('fs');
const path = require('path');

/**
 * Convierte la salida de Vitest/Jest (JSON) a la estructura requerida para test-results.json.
 * @param {object[]} results - array de resultados de test (formato Vitest/Jest)
 * @param {string} stack - stack detectado
 * @param {string} framework - "vitest" | "jest"
 */
function buildReport(results, stack, framework) {
  const now = new Date().toISOString();
  const testsCreated = [];
  const testsExecuted = [];
  const errors = [];
  const suggestions = [];

  results.forEach(test => {
    const file = test.file || test.path || test.name;
    testsExecuted.push({file, status: test.status || test.result?.status || 'unknown', duration: test.duration || '0ms'});
    if (test.status === 'failed' || test.result?.status === 'failed') {
      const errMsg = test.error?.message || test.failures?.[0]?.message || 'Error desconocido';
      errors.push({test: test.title || test.name, error: errMsg});
      // Sugerencias básicas genéricas
      suggestions.push({test: test.title || test.name, suggestion: 'Revisa la lógica del test y verifica que los mocks estén configurados'});
    }
  });

  const summary = {
    total: testsExecuted.length,
    passed: testsExecuted.filter(t => t.status === 'passed').length,
    failed: testsExecuted.filter(t => t.status === 'failed').length,
    skipped: testsExecuted.filter(t => t.status === 'skipped').length,
  };

  return {
    timestamp: now,
    stackDetected: stack,
    framework,
    testsCreated,
    testsExecuted,
    summary,
    errors,
    suggestions,
  };
}

if (require.main === module) {
  const [,, resultsPath, stack, framework] = process.argv;
  if (!resultsPath) {
    console.error('Uso: node generate-log.js <ruta-json-results> <stack> <framework>');
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
  const report = buildReport(raw.testResults || raw, stack, framework);
  const outPath = path.join(process.cwd(), 'test-results.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log('Reportado a', outPath);
}

module.exports = {buildReport};
