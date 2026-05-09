import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, describe, expect, it } from "vitest";
import { installSkills } from "../src/core/install-skill";
import { removeInstalledSkill } from "../src/core/remove-installed-skill";
import { updateInstalledSkill } from "../src/core/update-installed-skill";

const tempRoots: string[] = [];

afterEach(async () => {
  for (const root of tempRoots) {
    await fs.remove(root);
  }
  tempRoots.length = 0;
});

describe("remove/update protections", () => {
  it("remove dry-run has no side effects", async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "remove-dry-"));
    tempRoots.push(tempRoot);

    const installed = await installSkills({ skillIds: ["skill-apple-ui"], projectRoot: tempRoot });
    const target = installed.items[0]!.targetPath;
    await removeInstalledSkill({ skillId: "skill-apple-ui", dryRun: true, projectRoot: tempRoot });
    expect(await fs.pathExists(target)).toBe(true);
  });

  it("update rejects sourceSkillsDir collision", async () => {
    await expect(
      updateInstalledSkill({ skillId: "skill-apple-ui", target: "skills", projectRoot: process.cwd() })
    ).rejects.toThrow("Refusing to update source skills directory");
  });

  it("remove rejects sourceSkillsDir collision", async () => {
    await expect(
      removeInstalledSkill({ skillId: "skill-apple-ui", target: "skills", projectRoot: process.cwd() })
    ).rejects.toThrow("Refusing to remove source skills directory");
  });
});
