import { listAgents } from "../../core/agents";
import { logger } from "../../utils/logger";
import { DEFAULT_LOCAL_SKILLS_DIR } from "../../utils/paths";

export function runAgentsCommand(): void {
  logger.info("Agentes disponibles:\n");
  for (const agent of listAgents()) {
    console.log(`- ${agent.id}`);
    console.log(`  Ruta de instalacion: ${DEFAULT_LOCAL_SKILLS_DIR}`);
    console.log(`  Metadata legacy: ${agent.defaultTargetPath}`);
    console.log("");
  }
}
