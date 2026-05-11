import type { Skill } from "../types/skill";
import { LocalSkillSource, type SkillSource } from "./skill-source";
import { validateSkillDirectory, type SkillValidationResult } from "./validate-skill";
import { getSourceSkillsDir } from "../utils/paths";

export class SkillRegistry {
  constructor(private readonly source: SkillSource) {}

  listSkills(): Promise<Skill[]> {
    return this.source.list();
  }

  getSkill(skillId: string): Promise<Skill> {
    return this.source.get(skillId);
  }

  searchSkills(query: string): Promise<Skill[]> {
    return this.source.search(query);
  }

  async validateSkill(skillId: string): Promise<SkillValidationResult> {
    const skill = await this.getSkill(skillId);
    return validateSkillDirectory(skill.sourcePath);
  }
}

export function createLocalRegistry(sourceSkillsDir?: string): SkillRegistry {
  const resolvedSourceSkillsDir = sourceSkillsDir ?? getSourceSkillsDir();

  return new SkillRegistry(
    new LocalSkillSource({
      sourceSkillsDir: resolvedSourceSkillsDir
    })
  );
}
