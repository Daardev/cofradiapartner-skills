const fs = require('fs');
const path = require('path');

function detectStack(projectRoot) {
  const pkgPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return {stack: 'unknown'};
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
  const stackMap = [
    {key: 'astro', name: 'astro'},
    {key: 'next', name: 'next'},
    {key: 'react', name: 'react'},
    {key: 'vue', name: 'vue'},
    {key: 'svelte', name: 'svelte'},
    {key: '@nestjs', name: 'nestjs'},
    {key: 'express', name: 'express'},
    {key: 'node', name: 'node'},
  ];
  for (const entry of stackMap) {
    if (Object.keys(deps).some(d => d.startsWith(entry.key))) {
      return {stack: entry.name};
    }
  }
  return {stack: 'vanilla'};
}

// When called directly, output JSON to stdout
if (require.main === module) {
  const projectRoot = process.argv[2] || process.cwd();
  const result = detectStack(projectRoot);
  console.log(JSON.stringify(result));
}

module.exports = {detectStack};
