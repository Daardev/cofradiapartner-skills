export const AGENT_IDS = [
  "claude",
  "codex",
  "opencode",
  "cursor",
  "windsurf",
  "generic"
] as const;

export type AgentId = (typeof AGENT_IDS)[number];

export interface AgentDefinition {
  id: AgentId;
  label: string;
  defaultTargetPath: string;
}
