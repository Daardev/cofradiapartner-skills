import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const moduleDir = path.dirname(fileURLToPath(import.meta.url));

export function getPackageRootDir(): string {
  let current = moduleDir;

  for (let i = 0; i < 6; i += 1) {
    const packageJsonPath = path.join(current, "package.json");
    if (existsSync(packageJsonPath)) {
      return current;
    }
    const parent = path.resolve(current, "..");
    if (parent === current) {
      break;
    }
    current = parent;
  }

  return path.resolve(moduleDir, "..", "..");
}

export function getSourceSkillsDir(): string {
  return path.resolve(getPackageRootDir(), "skills");
}

export function normalizePathForOutput(value: string): string {
  return value.replace(/\\/g, "/");
}

export function isPathInside(parentDir: string, childPath: string): boolean {
  const parent = path.resolve(parentDir);
  const child = path.resolve(childPath);
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}
