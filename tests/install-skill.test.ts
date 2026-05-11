import path from "node:path";
import os from "node:os";
import fs from "fs-extra";
import { afterEach, describe, expect, it, vi } from "vitest";
import { installSkills } from "../src/core/install-skill";

const tempRoots: string[] = [];

afterEach(async () => {
  for (const root of tempRoots) {
    await fs.remove(root);
  }
  tempRoots.length = 0;
});

describe("installSkills", () => {
  it("installs skill in unified local route", async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "install-unified-local-"));
    tempRoots.push(tempRoot);

    const result = await installSkills({
      skillIds: ["skill-apple-ui"],
      projectRoot: tempRoot
    });

    expect(result.items[0]?.targetPath).toBe(
      path.resolve(tempRoot, ".agents/skills", "skill-apple-ui")
    );
    expect(await fs.pathExists(result.items[0]!.targetPath)).toBe(true);
  });

  it("installs skill in unified global route", async () => {
    const tempHome = await fs.mkdtemp(path.join(os.tmpdir(), "install-global-"));
    tempRoots.push(tempHome);
    const homedirSpy = vi.spyOn(os, "homedir").mockReturnValue(tempHome);

    try {
      const result = await installSkills({
        skillIds: ["skill-apple-ui"],
        global: true,
        projectRoot: path.join(tempHome, "project")
      });

      expect(result.items[0]?.targetPath).toBe(
        path.resolve(tempHome, ".agents/skills", "skill-apple-ui")
      );
      expect(await fs.pathExists(result.items[0]!.targetPath)).toBe(true);
    } finally {
      homedirSpy.mockRestore();
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
