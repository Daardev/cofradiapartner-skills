import path from "node:path";
import { DEFAULT_AGENT_ID, getAgentDefinition } from "./agents";
import type { AgentId } from "../types/agent";

export interface ResolveTargetPathOptions {
  agentId?: AgentId;
  customTargetPath?: string;
  projectRoot?: string;
}

export function resolveTargetPath(options: ResolveTargetPathOptions = {}): string {
  const projectRoot = options.projectRoot ?? process.cwd();
  const agentId = options.agentId ?? DEFAULT_AGENT_ID;

  if (options.customTargetPath) {
    return path.resolve(projectRoot, options.customTargetPath);
  }

  const agent = getAgentDefinition(agentId);
  return path.resolve(projectRoot, agent.defaultTargetPath);
}
