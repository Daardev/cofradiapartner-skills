import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, describe, expect, it } from "vitest";
import { validateSkillDirectory } from "../src/core/validate-skill";

async function createTempSkill(
  baseName: string,
  files: { skillMd?: string; examples?: string; readme?: string }
): Promise<string> {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), `${baseName}-`));
  const skillDir = path.join(tempRoot, "skill-test");
  await fs.ensureDir(skillDir);

  if (files.skillMd !== undefined) {
    await fs.writeFile(path.join(skillDir, "skill.md"), files.skillMd, "utf8");
  }
  if (files.examples !== undefined) {
    await fs.writeFile(path.join(skillDir, "examples.md"), files.examples, "utf8");
  }
  if (files.readme !== undefined) {
    await fs.writeFile(path.join(skillDir, "README.md"), files.readme, "utf8");
  }

  return tempRoot;
}

const tempRoots: string[] = [];

afterEach(async () => {
  for (const root of tempRoots) {
    await fs.remove(root);
  }
  tempRoots.length = 0;
});

describe("validateSkillDirectory", () => {
  it("validates a correct skill with name and description", async () => {
    const tempRoot = await createTempSkill("valid-skill", {
      skillMd: [
        "---",
        "name: Demo Skill",
        "description: A valid skill",
        "---",
        "",
        "# Demo"
      ].join("\n"),
      examples: "# Examples",
      readme: "# README"
    });
    tempRoots.push(tempRoot);

    const result = await validateSkillDirectory(path.join(tempRoot, "skill-test"));
    expect(result.metadata.name).toBe("Demo Skill");
    expect(result.metadata.description).toBe("A valid skill");
  });

  it("fails when skill.md is missing", async () => {
    const tempRoot = await createTempSkill("missing-skill-md", {
      examples: "# Examples",
      readme: "# README"
    });
    tempRoots.push(tempRoot);

    await expect(
      validateSkillDirectory(path.join(tempRoot, "skill-test"))
    ).rejects.toThrow(/Missing file: skill-test[\\/]+skill\.md/);
  });

  it("fails when name is missing", async () => {
    const tempRoot = await createTempSkill("missing-name", {
      skillMd: ["---", "description: Has description", "---"].join("\n"),
      examples: "# Examples",
      readme: "# README"
    });
    tempRoots.push(tempRoot);

    await expect(
      validateSkillDirectory(path.join(tempRoot, "skill-test"))
    ).rejects.toThrow("Missing or empty \"name\" in skill.md");
  });

  it("fails when description is missing", async () => {
    const tempRoot = await createTempSkill("missing-description", {
      skillMd: ["---", "name: Name only", "---"].join("\n"),
      examples: "# Examples",
      readme: "# README"
    });
    tempRoots.push(tempRoot);

    await expect(
      validateSkillDirectory(path.join(tempRoot, "skill-test"))
    ).rejects.toThrow("Missing or empty \"description\" in skill.md");
  });

  it("fails with empty frontmatter", async () => {
    const tempRoot = await createTempSkill("empty-frontmatter", {
      skillMd: ["---", "---"].join("\n"),
      examples: "# Examples",
      readme: "# README"
    });
    tempRoots.push(tempRoot);

    await expect(
      validateSkillDirectory(path.join(tempRoot, "skill-test"))
    ).rejects.toThrow("Missing or empty \"name\" in skill.md");
  });

  it("fails when description is empty", async () => {
    const tempRoot = await createTempSkill("empty-description", {
      skillMd: ["---", "name: Demo", "description:", "---"].join("\n"),
      examples: "# Examples",
      readme: "# README"
    });
    tempRoots.push(tempRoot);

    await expect(
      validateSkillDirectory(path.join(tempRoot, "skill-test"))
    ).rejects.toThrow("Missing or empty \"description\" in skill.md");
  });
});
