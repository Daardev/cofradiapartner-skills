import { createLocalRegistry } from "../../core/registry";
import { logger } from "../../utils/logger";

export async function runListCommand(): Promise<void> {
  const registry = createLocalRegistry();
  const skills = await registry.listSkills();

  logger.info("Skills disponibles:\n");
  for (const skill of skills) {
    console.log(`- ${skill.id}`);
    console.log(`  ${skill.name}`);
    console.log(`  ${skill.description}`);
  }
}
