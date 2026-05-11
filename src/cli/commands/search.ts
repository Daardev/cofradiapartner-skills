import { createLocalRegistry } from "../../core/registry";
import type { Skill } from "../../types/skill";
import { logger } from "../../utils/logger";

export async function searchSkills(query: string): Promise<Skill[]> {
  const registry = createLocalRegistry();
  return registry.searchSkills(query);
}

export async function runSearchCommand(query: string): Promise<void> {
  const skills = await searchSkills(query);

  if (skills.length === 0) {
    logger.info(`No se encontraron skills para "${query}".`);
    return;
  }

  logger.info(`Resultados para "${query}":\n`);
  for (const skill of skills) {
    console.log(`- ${skill.id}`);
    console.log(`  ${skill.name}`);
    console.log(`  ${skill.description}`);
  }
}
