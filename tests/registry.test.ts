import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, describe, expect, it } from "vitest";
import { SkillRegistry, createLocalRegistry } from "../src/core/registry";
import { LocalSkillSource } from "../src/core/skill-source";

const tempRoots: string[] = [];

afterEach(async () => {
  for (const root of tempRoots) {
    await fs.remove(root);
  }
  tempRoots.length = 0;
});

describe("SkillRegistry", () => {
  it("lists skill-apple-ui from local source directory", async () => {
    const registry = createLocalRegistry(path.resolve(process.cwd(), "skills"));
    const skills = await registry.listSkills();

    expect(skills.some((skill) => skill.id === "skill-apple-ui")).toBe(true);
  });

  it("reads metadata and sourcePath for skill-apple-ui", async () => {
    const registry = createLocalRegistry(path.resolve(process.cwd(), "skills"));
    const skill = await registry.getSkill("skill-apple-ui");

    expect(skill.name).toBe("Apple UI");
    expect(skill.description.length).toBeGreaterThan(0);
    expect(skill.sourcePath).toBe(path.resolve(process.cwd(), "skills", "skill-apple-ui"));
  });

  it("fails when skill does not exist", async () => {
    const registry = createLocalRegistry(path.resolve(process.cwd(), "skills"));

    await expect(registry.getSkill("skill-missing")).rejects.toThrow(
      "Skill directory not found: skill-missing"
    );
  });

  it("uses explicit sourceSkillsDir in LocalSkillSource", async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "source-dir-"));
    tempRoots.push(tempRoot);

    const sourceSkillsDir = path.join(tempRoot, "source-skills");
    const skillDir = path.join(sourceSkillsDir, "skill-local");
    await fs.ensureDir(skillDir);
    await fs.writeFile(
      path.join(skillDir, "skill.md"),
      ["---", "name: Local Skill", "description: Local description", "---"].join(
        "\n"
      ),
      "utf8"
    );
    await fs.writeFile(path.join(skillDir, "examples.md"), "# Examples", "utf8");
    await fs.writeFile(path.join(skillDir, "README.md"), "# README", "utf8");

    const registry = new SkillRegistry(new LocalSkillSource({ sourceSkillsDir }));
    const skills = await registry.listSkills();

    expect(skills).toHaveLength(1);
    expect(skills[0]?.id).toBe("skill-local");
    expect(skills[0]?.sourcePath).toBe(path.join(sourceSkillsDir, "skill-local"));
  });
});
