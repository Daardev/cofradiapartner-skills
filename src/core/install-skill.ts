import path from "node:path";
import fs from "fs-extra";
import { createLocalRegistry } from "./registry";
import { resolveTargetPath } from "./resolve-target-path";
import type { AgentId } from "../types/agent";
import { AppError } from "../utils/errors";

export type ConflictStrategy = "cancel" | "overwrite" | "copy";

export interface InstallOptions {
  skillIds: string[];
  all?: boolean;
  agentId?: AgentId;
  target?: string;
  global?: boolean;
  dryRun?: boolean;
  conflictStrategy?: ConflictStrategy;
  projectRoot?: string;
}

export interface InstallResultItem {
  skillId: string;
  sourcePath: string;
  targetPath: string;
  files: string[];
  action: "installed" | "dry-run" | "skipped";
}

export interface InstallResult {
  items: InstallResultItem[];
}

function resolveCopyPath(basePath: string, exists: (value: string) => Promise<boolean>) {
  return async (): Promise<string> => {
    let index = 2;
    while (true) {
      const next = `${basePath}-${index}`;
      if (!(await exists(next))) {
        return next;
      }
      index += 1;
    }
  };
}

export async function installSkills(options: InstallOptions): Promise<InstallResult> {
  const registry = createLocalRegistry();
  if (options.all && options.skillIds.length > 0) {
    throw new AppError(
      "INVALID_ARGUMENT",
      "install --all does not accept positional skill IDs"
    );
  }

  if (!options.all && options.skillIds.length === 0) {
    throw new AppError("INVALID_ARGUMENT", "install requires skill IDs or --all");
  }

  const skills = options.all ? await registry.listSkills() : await Promise.all(options.skillIds.map((id) => registry.getSkill(id)));

  const targetRoot = resolveTargetPath({
    agentId: options.agentId,
    customTargetPath: options.target,
    projectRoot: options.projectRoot,
    global: options.global
  });

  const results: InstallResultItem[] = [];

  for (const skill of skills) {
    const baseTarget = path.join(targetRoot, skill.id);
    let finalTarget = baseTarget;
    const exists = await fs.pathExists(baseTarget);

    if (exists) {
      const strategy = options.conflictStrategy;
      if (!strategy) {
        throw new AppError(
          "CONFLICT",
          `Skill already exists at destination: ${baseTarget}`
        );
      }

      if (strategy === "cancel") {
        results.push({
          skillId: skill.id,
          sourcePath: skill.sourcePath,
          targetPath: baseTarget,
          files: ["skill.md", "examples.md", "README.md"],
          action: "skipped"
        });
        continue;
      }

      if (strategy === "copy") {
        finalTarget = await resolveCopyPath(baseTarget, (value) => fs.pathExists(value))();
      }
    }

    const files = ["skill.md", "examples.md", "README.md"];

    if (!options.dryRun) {
      await fs.ensureDir(path.dirname(finalTarget));
      if (exists && options.conflictStrategy === "overwrite") {
        await fs.remove(finalTarget);
      }
      await fs.copy(skill.sourcePath, finalTarget);
    }

    results.push({
      skillId: skill.id,
      sourcePath: skill.sourcePath,
      targetPath: finalTarget,
      files,
      action: options.dryRun ? "dry-run" : "installed"
    });
  }

  return { items: results };
}
