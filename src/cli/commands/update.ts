import { confirm } from "@clack/prompts";
import { updateInstalledSkill } from "../../core/update-installed-skill";
import { AppError } from "../../utils/errors";
import { logger } from "../../utils/logger";

export interface UpdateCommandOptions {
  target?: string;
  global?: boolean;
  dryRun?: boolean;
  yes?: boolean;
}

export async function runUpdateCommand(
  skillId: string,
  options: UpdateCommandOptions
): Promise<void> {
  if (!options.dryRun && !options.yes) {
    const isInteractive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
    if (!isInteractive) {
      throw new AppError(
        "INVALID_ARGUMENT",
        "Destructive update requires confirmation in interactive mode or explicit --yes"
      );
    }

    const accepted = await confirm({
      message: `Confirmas actualizar la skill instalada \"${skillId}\"?`
    });

    if (!accepted) {
      throw new AppError("USER_CANCELLED", "Operation cancelled by user");
    }
  }

  const updatedPath = await updateInstalledSkill({
    skillId,
    target: options.target,
    global: options.global,
    dryRun: options.dryRun
  });

  if (options.dryRun) {
    logger.info(`Dry run: se actualizaria ${updatedPath}`);
  } else {
    logger.success(`Skill actualizada: ${updatedPath}`);
  }
}
