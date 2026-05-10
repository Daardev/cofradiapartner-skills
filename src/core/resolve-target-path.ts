import path from "node:path";
import { DEFAULT_AGENT_ID } from "./agents";
import type { AgentId } from "../types/agent";
import { DEFAULT_LOCAL_SKILLS_DIR, getGlobalSkillsDir } from "../utils/paths";

export interface ResolveTargetPathOptions {
  agentId?: AgentId;
  customTargetPath?: string;
  projectRoot?: string;
  global?: boolean;
}

export function resolveTargetPath(options: ResolveTargetPathOptions = {}): string {
  const projectRoot = options.projectRoot ?? process.cwd();
  const agentId = options.agentId ?? DEFAULT_AGENT_ID;

  if (options.customTargetPath) {
    return path.resolve(projectRoot, options.customTargetPath);
  }

  void agentId;

  if (options.global) {
    return getGlobalSkillsDir();
  }

  return path.resolve(projectRoot, DEFAULT_LOCAL_SKILLS_DIR);
}
