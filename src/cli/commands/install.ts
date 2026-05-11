import { select } from "@clack/prompts";
import { installSkills, type ConflictStrategy } from "../../core/install-skill";
import { AppError } from "../../utils/errors";
import { logger } from "../../utils/logger";

export interface InstallCommandOptions {
  target?: string;
  all?: boolean;
  global?: boolean;
  dryRun?: boolean;
  yes?: boolean;
  conflict?: ConflictStrategy;
}

export async function runInstallCommand(
  skillIds: string[],
  options: InstallCommandOptions
): Promise<void> {
  let conflictStrategy = options.conflict;
  const isInteractive = Boolean(process.stdin.isTTY && process.stdout.isTTY);

  try {
    const result = await installSkills({
      skillIds,
      all: options.all,
      target: options.target,
      global: options.global,
      dryRun: options.dryRun,
      conflictStrategy
    });

    if (options.dryRun) {
      logger.info("Dry run activo.\n");
    }

    for (const item of result.items) {
      console.log(`Skill: ${item.skillId}`);
      console.log(`Destino: ${item.targetPath}`);
      console.log(`Accion: ${item.action}`);
      console.log("Archivos:");
      for (const file of item.files) {
        console.log(`- ${file}`);
      }
      console.log("");
    }
  } catch (error) {
    if (!options.yes && error instanceof Error && error.message.includes("already exists")) {
      if (!isInteractive) {
        throw new AppError(
          "CONFLICT",
          "Skill already exists and no interactive terminal is available. Use a safe explicit strategy."
        );
      }

      const selected = await select({
        message: "La skill ya existe en destino. Que quieres hacer?",
        options: [
          { value: "cancel", label: "Cancelar" },
          { value: "overwrite", label: "Sobrescribir" },
          { value: "copy", label: "Crear copia" }
        ]
      });

      if (typeof selected === "string") {
        conflictStrategy = selected as ConflictStrategy;
        await runInstallCommand(skillIds, { ...options, conflict: conflictStrategy, yes: true });
        return;
      }
    }

    if (options.yes && error instanceof Error && error.message.includes("already exists")) {
      throw new AppError(
        "CONFLICT",
        "Conflict detected. --yes does not authorize destructive overwrite automatically."
      );
    }

    throw error;
  }
}
