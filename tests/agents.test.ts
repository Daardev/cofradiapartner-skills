import { describe, expect, it } from "vitest";
import {
  AGENTS,
  DEFAULT_AGENT_ID,
  getAgentDefinition,
  isAgentId,
  listAgents
} from "../src/core/agents";

describe("agents", () => {
  it("includes all supported agents", () => {
    expect(Object.keys(AGENTS)).toEqual([
      "claude",
      "codex",
      "opencode",
      "cursor",
      "windsurf",
      "generic"
    ]);
  });

  it("uses claude as default agent", () => {
    expect(DEFAULT_AGENT_ID).toBe("claude");
  });

  it("returns expected default routes", () => {
    expect(getAgentDefinition("claude").defaultTargetPath).toBe(".claude/skills");
    expect(getAgentDefinition("codex").defaultTargetPath).toBe(".codex/skills");
    expect(getAgentDefinition("opencode").defaultTargetPath).toBe(".opencode/skills");
    expect(getAgentDefinition("cursor").defaultTargetPath).toBe(".cursor/rules");
    expect(getAgentDefinition("windsurf").defaultTargetPath).toBe(
      ".windsurf/rules"
    );
    expect(getAgentDefinition("generic").defaultTargetPath).toBe("skills");
  });

  it("validates agent ids", () => {
    expect(isAgentId("claude")).toBe(true);
    expect(isAgentId("invalid-agent")).toBe(false);
  });

  it("throws for invalid agent", () => {
    expect(() => getAgentDefinition("invalid-agent")).toThrow(
      "Invalid agent: invalid-agent"
    );
  });

  it("lists all definitions in stable order", () => {
    expect(listAgents().map((agent) => agent.id)).toEqual([
      "claude",
      "codex",
      "opencode",
      "cursor",
      "windsurf",
      "generic"
    ]);
  });
});
