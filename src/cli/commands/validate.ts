import { createLocalRegistry } from "../../core/registry";
import { AppError } from "../../utils/errors";
import { logger } from "../../utils/logger";

export async function runValidateCommand(skillId?: string, all = false): Promise<void> {
  if (all && skillId) {
    throw new AppError(
      "INVALID_ARGUMENT",
      "validate --all does not accept positional skill ID"
    );
  }

  const registry = createLocalRegistry();
  const ids = all ? (await registry.listSkills()).map((skill) => skill.id) : [skillId ?? ""];

  if (!all && !skillId) {
    throw new AppError("INVALID_ARGUMENT", "validate requires a skill ID or --all");
  }

  const errors: string[] = [];
  for (const id of ids) {
    try {
      await registry.validateSkill(id);
      logger.success(`Skill valida: ${id}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown validation error";
      errors.push(`${id}: ${message}`);
      logger.error(`Skill invalida: ${id}`);
    }
  }

  if (errors.length > 0) {
    throw new AppError("VALIDATION_FAILED", "Skill validation failed", errors);
  }
}
