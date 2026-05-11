import path from "node:path";
import fs from "fs-extra";
import { createLocalRegistry } from "./registry";
import { resolveTargetPath } from "./resolve-target-path";
import { getSourceSkillsDir, isPathInside } from "../utils/paths";
import { AppError } from "../utils/errors";

export interface UpdateOptions {
  skillId: string;
  target?: string;
  global?: boolean;
  dryRun?: boolean;
  projectRoot?: string;
}

export async function updateInstalledSkill(options: UpdateOptions): Promise<string> {
  const registry = createLocalRegistry();
  const sourceSkill = await registry.getSkill(options.skillId);
  const targetRoot = resolveTargetPath({
    customTargetPath: options.target,
    projectRoot: options.projectRoot,
    global: options.global
  });
  const targetSkillDir = path.join(targetRoot, options.skillId);
  const sourceSkillsDir = getSourceSkillsDir();

  if (isPathInside(sourceSkillsDir, targetSkillDir)) {
    throw new AppError("OPERATION_NOT_ALLOWED", "Refusing to update source skills directory");
  }

  if (!(await fs.pathExists(targetSkillDir))) {
    throw new AppError(
      "NOT_FOUND",
      `Installed skill not found: ${options.skillId}. Use install instead.`
    );
  }

  if (!options.dryRun) {
    await fs.remove(targetSkillDir);
    await fs.copy(sourceSkill.sourcePath, targetSkillDir);
  }

  return targetSkillDir;
}
