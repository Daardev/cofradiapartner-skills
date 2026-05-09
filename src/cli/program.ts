import { Command } from "commander";
import { runInteractiveMode } from "./interactive";
import { runAgentsCommand } from "./commands/agents";
import { runCreateCommand } from "./commands/create";
import { runDoctorCommand } from "./commands/doctor";
import { runInstallCommand } from "./commands/install";
import { runListCommand } from "./commands/list";
import { runRemoveCommand } from "./commands/remove";
import { runUpdateCommand } from "./commands/update";
import { runValidateCommand } from "./commands/validate";
import { AGENT_IDS } from "../types/agent";
import { AppError, toAppError } from "../utils/errors";
import { logger } from "../utils/logger";

export function createProgram(): Command {
  const program = new Command();

  program
    .name("create-skill")
    .description("CLI para instalar skills reutilizables")
    .option("--debug", "Show stack traces", false);

  program.command("list").action(async () => runListCommand());

  program.command("agents").action(() => runAgentsCommand());

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
    .option("--agent <agent>", "Target agent")
    .option("--target <path>", "Custom target path")
    .option("--all", "Install all skills")
    .option("--dry-run", "Run without writing files")
    .option("--yes", "Skip safe confirmations")
    .action(
      async (
        skills: string[],
        options: {
          agent?: string;
          target?: string;
          all?: boolean;
          dryRun?: boolean;
          yes?: boolean;
        }
      ) => {
        if (options.agent && !AGENT_IDS.includes(options.agent as (typeof AGENT_IDS)[number])) {
          throw new AppError("INVALID_ARGUMENT", `Invalid agent: ${options.agent}`);
        }
        await runInstallCommand(skills ?? [], {
          agent: options.agent as (typeof AGENT_IDS)[number] | undefined,
          target: options.target,
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
    .option("--agent <agent>")
    .option("--target <path>")
    .option("--yes")
    .option("--dry-run")
    .action(async (skillId: string, options) => {
      if (options.agent && !AGENT_IDS.includes(options.agent as (typeof AGENT_IDS)[number])) {
        throw new AppError("INVALID_ARGUMENT", `Invalid agent: ${options.agent}`);
      }
      await runRemoveCommand(skillId, options);
    });

  program
    .command("update")
    .argument("<skillId>")
    .option("--agent <agent>")
    .option("--target <path>")
    .option("--dry-run")
    .option("--yes")
    .action(async (skillId: string, options) => {
      if (options.agent && !AGENT_IDS.includes(options.agent as (typeof AGENT_IDS)[number])) {
        throw new AppError("INVALID_ARGUMENT", `Invalid agent: ${options.agent}`);
      }
      await runUpdateCommand(skillId, options);
    });

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
