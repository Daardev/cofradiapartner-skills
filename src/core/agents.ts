import { AGENT_IDS, type AgentDefinition, type AgentId } from "../types/agent";

export const DEFAULT_AGENT_ID: AgentId = "claude";

export const AGENTS: Record<AgentId, AgentDefinition> = {
  claude: {
    id: "claude",
    label: "Claude",
    defaultTargetPath: ".claude/skills"
  },
  codex: {
    id: "codex",
    label: "Codex",
    defaultTargetPath: ".codex/skills"
  },
  opencode: {
    id: "opencode",
    label: "OpenCode",
    defaultTargetPath: ".opencode/skills"
  },
  cursor: {
    id: "cursor",
    label: "Cursor",
    defaultTargetPath: ".cursor/rules"
  },
  windsurf: {
    id: "windsurf",
    label: "Windsurf",
    defaultTargetPath: ".windsurf/rules"
  },
  generic: {
    id: "generic",
    label: "Generic",
    defaultTargetPath: "skills"
  }
};

export function listAgents(): AgentDefinition[] {
  return AGENT_IDS.map((id) => AGENTS[id]);
}

export function isAgentId(value: string): value is AgentId {
  return AGENT_IDS.includes(value as AgentId);
}

export function getAgentDefinition(agentId: string): AgentDefinition {
  if (!isAgentId(agentId)) {
    throw new Error(`Invalid agent: ${agentId}`);
  }

  return AGENTS[agentId];
}
