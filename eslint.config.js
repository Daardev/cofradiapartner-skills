import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "skills/**"]
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts", "tests/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: false
      }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
];
