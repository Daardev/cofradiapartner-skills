import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, describe, expect, it } from "vitest";
import { createSkillScaffold } from "../src/core/create-skill-scaffold";

const tempRoots: string[] = [];

afterEach(async () => {
  for (const root of tempRoots) {
    await fs.remove(root);
  }
  tempRoots.length = 0;
});

describe("createSkillScaffold", () => {
  it("creates scaffold files", async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "create-skill-"));
    tempRoots.push(tempRoot);

    const skillDir = await createSkillScaffold("skill-demo", tempRoot);
    expect(await fs.pathExists(path.join(skillDir, "skill.md"))).toBe(true);
    expect(await fs.pathExists(path.join(skillDir, "examples.md"))).toBe(true);
    expect(await fs.pathExists(path.join(skillDir, "README.md"))).toBe(true);
  });
});
