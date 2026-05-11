import path from "node:path";
import fs from "fs-extra";
import type { Skill } from "../types/skill";
import { validateSkillDirectory } from "./validate-skill";

export interface SkillSource {
  list(): Promise<Skill[]>;
  get(skillId: string): Promise<Skill>;
  search(query: string): Promise<Skill[]>;
}

export interface LocalSkillSourceOptions {
  sourceSkillsDir: string;
}

export class LocalSkillSource implements SkillSource {
  readonly sourceSkillsDir: string;

  constructor(options: LocalSkillSourceOptions) {
    this.sourceSkillsDir = options.sourceSkillsDir;
  }

  async list(): Promise<Skill[]> {
    if (!(await fs.pathExists(this.sourceSkillsDir))) {
      throw new Error(`Source skills directory not found: ${this.sourceSkillsDir}`);
    }

    const entries = await fs.readdir(this.sourceSkillsDir);
    const skills: Skill[] = [];

    for (const entry of entries) {
      const skillDir = path.join(this.sourceSkillsDir, entry);
      const stat = await fs.stat(skillDir);
      if (!stat.isDirectory()) {
        continue;
      }

      const validated = await validateSkillDirectory(skillDir);
      skills.push({
        id: entry,
        name: validated.metadata.name,
        description: validated.metadata.description,
        sourcePath: skillDir
      });
    }

    return skills.sort((a, b) => a.id.localeCompare(b.id));
  }

  async get(skillId: string): Promise<Skill> {
    const skillDir = path.join(this.sourceSkillsDir, skillId);
    const validated = await validateSkillDirectory(skillDir);

    return {
      id: skillId,
      name: validated.metadata.name,
      description: validated.metadata.description,
      sourcePath: skillDir
    };
  }

  async search(query: string): Promise<Skill[]> {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (normalizedQuery.length === 0) {
      return [];
    }

    const skills = await this.list();

    return skills.filter((skill) => {
      const id = skill.id.toLocaleLowerCase();
      const name = skill.name.toLocaleLowerCase();
      const description = skill.description.toLocaleLowerCase();

      return (
        id.includes(normalizedQuery) ||
        name.includes(normalizedQuery) ||
        description.includes(normalizedQuery)
      );
    });
  }
}
