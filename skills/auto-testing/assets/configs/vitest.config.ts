/** @type {import('vitest').UserConfig} */
export default {
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
    // Busca los archivos de test en cualquier carpeta `tests` o `src` con extensión .test.ts[x]
    include: ['**/*.test.{ts,tsx,js,jsx}'],
  },
};
