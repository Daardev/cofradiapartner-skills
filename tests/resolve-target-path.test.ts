import path from "node:path";
import os from "node:os";
import { describe, expect, it } from "vitest";
import { resolveTargetPath } from "../src/core/resolve-target-path";

describe("resolveTargetPath", () => {
  const projectRoot = path.resolve("virtual-project");

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

  it("prioritizes custom target path over the default local route", () => {
    expect(
      resolveTargetPath({
        customTargetPath: "docs/ai-skills",
        global: true,
        projectRoot
      })
    ).toBe(path.resolve(projectRoot, "docs/ai-skills"));
  });

  it("resolves against process.cwd when no projectRoot is provided", () => {
    expect(resolveTargetPath({})).toBe(path.resolve(process.cwd(), ".agents/skills"));
  });
});
