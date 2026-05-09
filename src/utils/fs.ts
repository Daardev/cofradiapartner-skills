import path from "node:path";
import fs from "fs-extra";

export async function ensureWritableDirectory(dir: string): Promise<void> {
  await fs.ensureDir(dir);
  const probe = path.join(dir, `.create-skill-write-test-${Date.now()}`);
  await fs.writeFile(probe, "ok", "utf8");
  await fs.remove(probe);
}

export async function listFilesInDir(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir);
  return entries.sort((a, b) => a.localeCompare(b));
}
