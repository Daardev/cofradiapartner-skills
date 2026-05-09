import { listAgents } from "../../core/agents";
import { logger } from "../../utils/logger";

export function runAgentsCommand(): void {
  logger.info("Agentes disponibles:\n");
  for (const agent of listAgents()) {
    console.log(`- ${agent.id}`);
    console.log(`  Ruta por defecto: ${agent.defaultTargetPath}`);
    console.log("");
  }
}
