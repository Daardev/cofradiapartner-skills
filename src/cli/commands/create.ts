import { createSkillScaffold } from "../../core/create-skill-scaffold";
import { logger } from "../../utils/logger";

export async function runCreateCommand(skillName: string): Promise<void> {
  const dir = await createSkillScaffold(skillName);
  logger.success(`Skill scaffold created at ${dir}`);
}
