import path from "node:path";
import fs from "fs-extra";
import type { AgentId } from "../types/agent";
import { resolveTargetPath } from "./resolve-target-path";
import { getSourceSkillsDir, isPathInside } from "../utils/paths";
import { AppError } from "../utils/errors";

export interface RemoveOptions {
  skillId: string;
  agentId?: AgentId;
  target?: string;
  global?: boolean;
  dryRun?: boolean;
  projectRoot?: string;
}

export async function removeInstalledSkill(options: RemoveOptions): Promise<string> {
  const targetRoot = resolveTargetPath({
    agentId: options.agentId,
    customTargetPath: options.target,
    projectRoot: options.projectRoot,
    global: options.global
  });
  const targetSkillDir = path.join(targetRoot, options.skillId);
  const sourceSkillsDir = getSourceSkillsDir();

  if (isPathInside(sourceSkillsDir, targetSkillDir)) {
    throw new AppError("OPERATION_NOT_ALLOWED", "Refusing to remove source skills directory");
  }

  if (!(await fs.pathExists(targetSkillDir))) {
    throw new AppError("NOT_FOUND", `Installed skill not found: ${options.skillId}`);
  }

  if (!options.dryRun) {
    await fs.remove(targetSkillDir);
  }

  return targetSkillDir;
}
