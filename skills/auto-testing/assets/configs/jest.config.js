/**
 * @type {import('jest').Config}
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['text', 'json', 'html'],
  testMatch: ['**/*.test.{ts,tsx,js,jsx}'],
};
