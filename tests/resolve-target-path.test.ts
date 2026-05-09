import path from "node:path";
import { describe, expect, it } from "vitest";
import { resolveTargetPath } from "../src/core/resolve-target-path";

describe("resolveTargetPath", () => {
  const projectRoot = path.resolve("virtual-project");

  it("resolves default route for each agent from projectRoot", () => {
    expect(resolveTargetPath({ agentId: "claude", projectRoot })).toBe(
      path.resolve(projectRoot, ".claude/skills")
    );
    expect(resolveTargetPath({ agentId: "codex", projectRoot })).toBe(
      path.resolve(projectRoot, ".codex/skills")
    );
    expect(resolveTargetPath({ agentId: "opencode", projectRoot })).toBe(
      path.resolve(projectRoot, ".opencode/skills")
    );
    expect(resolveTargetPath({ agentId: "cursor", projectRoot })).toBe(
      path.resolve(projectRoot, ".cursor/rules")
    );
    expect(resolveTargetPath({ agentId: "windsurf", projectRoot })).toBe(
      path.resolve(projectRoot, ".windsurf/rules")
    );
    expect(resolveTargetPath({ agentId: "generic", projectRoot })).toBe(
      path.resolve(projectRoot, "skills")
    );
  });

  it("uses claude route by default", () => {
    expect(resolveTargetPath({ projectRoot })).toBe(
      path.resolve(projectRoot, ".claude/skills")
    );
  });

  it("prioritizes custom target path over default agent path", () => {
    expect(
      resolveTargetPath({
        agentId: "claude",
        customTargetPath: "docs/ai-skills",
        projectRoot
      })
    ).toBe(path.resolve(projectRoot, "docs/ai-skills"));
  });

  it("resolves against process.cwd when no projectRoot is provided", () => {
    expect(resolveTargetPath({ agentId: "generic" })).toBe(
      path.resolve(process.cwd(), "skills")
    );
  });
});
