import { Command } from "commander";
import { runInteractiveMode } from "./interactive";
import { runCreateCommand } from "./commands/create";
import { runDoctorCommand } from "./commands/doctor";
import { runInstallCommand } from "./commands/install";
import { runListCommand } from "./commands/list";
import { runSearchCommand } from "./commands/search";
import { runRemoveCommand } from "./commands/remove";
import { runUpdateCommand } from "./commands/update";
import { runValidateCommand } from "./commands/validate";
import { toAppError } from "../utils/errors";
import { logger } from "../utils/logger";

export function createProgram(): Command {
  const program = new Command();

  program
    .name("create-skill")
    .description("CLI para instalar skills reutilizables")
    .option("--debug", "Show stack traces", false);
  program.exitOverride();

  program.command("list").action(async () => runListCommand());

  program.command("search").argument("<query>").action(async (query: string) => runSearchCommand(query));

  program
    .command("validate")
    .argument("[skillId]")
    .option("--all", "Validate all skills")
    .action(async (skillId: string | undefined, options: { all?: boolean }) => {
      await runValidateCommand(skillId, Boolean(options.all));
    });

  program.command("doctor").action(async () => runDoctorCommand());

  program
    .command("install")
    .argument("[skills...]")
    .option("--target <path>", "Custom target path")
    .option("--global", "Install into ~/.agents/skills")
    .option("--all", "Install all skills")
    .option("--dry-run", "Run without writing files")
    .option("--yes", "Skip safe confirmations")
    .action(
      async (
        skills: string[],
        options: {
          target?: string;
          global?: boolean;
          all?: boolean;
          dryRun?: boolean;
          yes?: boolean;
        }
      ) => {
        await runInstallCommand(skills ?? [], {
          target: options.target,
          global: options.global,
          all: options.all,
          dryRun: options.dryRun,
          yes: options.yes
        });
      }
    );

  program.command("create").argument("<skillName>").action(async (name: string) => runCreateCommand(name));

  program
    .command("remove")
    .argument("<skillId>")
    .option("--target <path>", "Custom target path")
    .option("--global", "Remove from ~/.agents/skills")
    .option("--yes")
    .option("--dry-run")
    .action(async (skillId: string, options) => runRemoveCommand(skillId, options));

  program
    .command("update")
    .argument("<skillId>")
    .option("--target <path>", "Custom target path")
    .option("--global", "Update in ~/.agents/skills")
    .option("--dry-run")
    .option("--yes")
    .action(async (skillId: string, options) => runUpdateCommand(skillId, options));

  program.action(async () => {
    await runInteractiveMode();
  });

  return program;
}

export async function runCli(argv: string[]): Promise<number> {
  try {
    await createProgram().parseAsync(argv);
    return 0;
  } catch (error) {
    const parsed = toAppError(error);
    logger.error(parsed.message);
    if (parsed.details && parsed.details.length > 0) {
      for (const detail of parsed.details) {
        logger.error(`- ${detail}`);
      }
    }
    const debug = argv.includes("--debug");
    if (debug && error instanceof Error) {
      console.error(error.stack);
    }
    return 1;
  }
}
