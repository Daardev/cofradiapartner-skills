import path from "node:path";
import { DEFAULT_LOCAL_SKILLS_DIR, getGlobalSkillsDir } from "../utils/paths";

export interface ResolveTargetPathOptions {
  customTargetPath?: string;
  projectRoot?: string;
  global?: boolean;
}

export function resolveTargetPath(options: ResolveTargetPathOptions = {}): string {
  const projectRoot = options.projectRoot ?? process.cwd();

  if (options.customTargetPath) {
    return path.resolve(projectRoot, options.customTargetPath);
  }

  if (options.global) {
    return getGlobalSkillsDir();
  }

  return path.resolve(projectRoot, DEFAULT_LOCAL_SKILLS_DIR);
}
