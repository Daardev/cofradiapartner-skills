import path from "node:path";
import os from "node:os";
import { describe, expect, it } from "vitest";
import { resolveTargetPath } from "../src/core/resolve-target-path";

describe("resolveTargetPath", () => {
  const projectRoot = path.resolve("virtual-project");

  it("resolves unified local route for each agent from projectRoot", () => {
    expect(resolveTargetPath({ agentId: "claude", projectRoot })).toBe(
      path.resolve(projectRoot, ".agents/skills")
    );
    expect(resolveTargetPath({ agentId: "codex", projectRoot })).toBe(
      path.resolve(projectRoot, ".agents/skills")
    );
    expect(resolveTargetPath({ agentId: "opencode", projectRoot })).toBe(
      path.resolve(projectRoot, ".agents/skills")
    );
    expect(resolveTargetPath({ agentId: "cursor", projectRoot })).toBe(
      path.resolve(projectRoot, ".agents/skills")
    );
    expect(resolveTargetPath({ agentId: "windsurf", projectRoot })).toBe(
      path.resolve(projectRoot, ".agents/skills")
    );
    expect(resolveTargetPath({ agentId: "generic", projectRoot })).toBe(
      path.resolve(projectRoot, ".agents/skills")
    );
  });

  it("uses unified local route by default", () => {
    expect(resolveTargetPath({ projectRoot })).toBe(
      path.resolve(projectRoot, ".agents/skills")
    );
  });

  it("resolves global route in user home", () => {
    expect(resolveTargetPath({ global: true, projectRoot })).toBe(
      path.resolve(os.homedir(), ".agents", "skills")
    );
  });

  it("prioritizes custom target path over default agent path", () => {
    expect(
      resolveTargetPath({
        agentId: "claude",
        customTargetPath: "docs/ai-skills",
        global: true,
        projectRoot
      })
    ).toBe(path.resolve(projectRoot, "docs/ai-skills"));
  });

  it("resolves against process.cwd when no projectRoot is provided", () => {
    expect(resolveTargetPath({ agentId: "generic" })).toBe(
      path.resolve(process.cwd(), ".agents/skills")
    );
  });
});
