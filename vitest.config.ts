import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    exclude: ["node_modules/**", "dist/**", "skills/**", ".opencode/**"]
  },
  coverage: {
    provider: "v8",
    include: ["src/**/*.ts"],
    exclude: ["dist/**", "node_modules/**", "tests/**", "coverage/**"]
  }
});
