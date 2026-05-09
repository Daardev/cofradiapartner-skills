import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, describe, expect, it } from "vitest";
import { installSkills } from "../src/core/install-skill";

const tempRoots: string[] = [];

afterEach(async () => {
  for (const root of tempRoots) {
    await fs.remove(root);
  }
  tempRoots.length = 0;
});

describe("installSkills", () => {
  it("installs skill in all agent default routes", async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "install-all-agents-"));
    tempRoots.push(tempRoot);

    const agents = [
      ["claude", ".claude/skills"],
      ["codex", ".codex/skills"],
      ["opencode", ".opencode/skills"],
      ["cursor", ".cursor/rules"],
      ["windsurf", ".windsurf/rules"],
      ["generic", "skills"]
    ] as const;

    for (const [agent, relativePath] of agents) {
      const result = await installSkills({
        skillIds: ["skill-apple-ui"],
        agentId: agent,
        projectRoot: tempRoot
      });
      expect(result.items[0]?.targetPath).toBe(
        path.resolve(tempRoot, relativePath, "skill-apple-ui")
      );
      expect(await fs.pathExists(result.items[0]!.targetPath)).toBe(true);
    }
  });

  it("respects custom target path", async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "install-custom-"));
    tempRoots.push(tempRoot);

    const result = await installSkills({
      skillIds: ["skill-apple-ui"],
      target: "docs/ai-skills",
      projectRoot: tempRoot
    });

    expect(result.items[0]?.targetPath).toBe(
      path.resolve(tempRoot, "docs/ai-skills", "skill-apple-ui")
    );
  });

  it("creates incremental copies on conflict with copy strategy", async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "install-copy-"));
    tempRoots.push(tempRoot);

    await installSkills({ skillIds: ["skill-apple-ui"], projectRoot: tempRoot });
    const second = await installSkills({
      skillIds: ["skill-apple-ui"],
      projectRoot: tempRoot,
      conflictStrategy: "copy"
    });

    expect(second.items[0]?.targetPath.endsWith("skill-apple-ui-2")).toBe(true);
  });

  it("fails on conflict without explicit strategy", async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "install-conflict-"));
    tempRoots.push(tempRoot);

    await installSkills({ skillIds: ["skill-apple-ui"], projectRoot: tempRoot });
    await expect(
      installSkills({ skillIds: ["skill-apple-ui"], projectRoot: tempRoot })
    ).rejects.toThrow("already exists");
  });
});
