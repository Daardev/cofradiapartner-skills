import { confirm } from "@clack/prompts";
import { removeInstalledSkill } from "../../core/remove-installed-skill";
import { AppError } from "../../utils/errors";
import { logger } from "../../utils/logger";

export interface RemoveCommandOptions {
  target?: string;
  global?: boolean;
  yes?: boolean;
  dryRun?: boolean;
}

export async function runRemoveCommand(
  skillId: string,
  options: RemoveCommandOptions
): Promise<void> {
  if (!options.dryRun && !options.yes) {
    const isInteractive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
    if (!isInteractive) {
      throw new AppError(
        "INVALID_ARGUMENT",
        "Destructive remove requires confirmation in interactive mode or explicit --yes"
      );
    }

    const accepted = await confirm({
      message: `Confirmas eliminar la skill instalada \"${skillId}\"?`
    });

    if (!accepted) {
      throw new AppError("USER_CANCELLED", "Operation cancelled by user");
    }
  }

  const removedPath = await removeInstalledSkill({
    skillId,
    target: options.target,
    global: options.global,
    dryRun: options.dryRun
  });

  if (options.dryRun) {
    logger.info(`Dry run: se eliminaria ${removedPath}`);
  } else {
    logger.success(`Skill eliminada: ${removedPath}`);
  }
}
