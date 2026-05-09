#!/usr/bin/env node

// src/cli/program.ts
import { Command } from "commander";

// src/cli/interactive.ts
import { confirm, multiselect, select as select2, text } from "@clack/prompts";

// src/types/agent.ts
var AGENT_IDS = [
  "claude",
  "codex",
  "opencode",
  "cursor",
  "windsurf",
  "generic"
];

// src/core/agents.ts
var DEFAULT_AGENT_ID = "claude";
var AGENTS = {
  claude: {
    id: "claude",
    label: "Claude",
    defaultTargetPath: ".claude/skills"
  },
  codex: {
    id: "codex",
    label: "Codex",
    defaultTargetPath: ".codex/skills"
  },
  opencode: {
    id: "opencode",
    label: "OpenCode",
    defaultTargetPath: ".opencode/skills"
  },
  cursor: {
    id: "cursor",
    label: "Cursor",
    defaultTargetPath: ".cursor/rules"
  },
  windsurf: {
    id: "windsurf",
    label: "Windsurf",
    defaultTargetPath: ".windsurf/rules"
  },
  generic: {
    id: "generic",
    label: "Generic",
    defaultTargetPath: "skills"
  }
};
function listAgents() {
  return AGENT_IDS.map((id) => AGENTS[id]);
}
function isAgentId(value) {
  return AGENT_IDS.includes(value);
}
function getAgentDefinition(agentId) {
  if (!isAgentId(agentId)) {
    throw new Error(`Invalid agent: ${agentId}`);
  }
  return AGENTS[agentId];
}

// src/core/skill-source.ts
import path2 from "path";
import fs2 from "fs-extra";

// src/core/validate-skill.ts
import path from "path";
import fs from "fs-extra";

// src/schemas/skill.schema.ts
import { z } from "zod";
var skillMetadataSchema = z.object({
  name: z.string({ required_error: 'Missing or empty "name" in skill.md' }).trim().min(1, 'Missing or empty "name" in skill.md'),
  description: z.string({ required_error: 'Missing or empty "description" in skill.md' }).trim().min(1, 'Missing or empty "description" in skill.md')
});

// src/utils/errors.ts
var AppError = class extends Error {
  code;
  details;
  constructor(code, message, details) {
    super(message);
    this.code = code;
    this.details = details;
  }
};
function isAppError(error) {
  return error instanceof AppError;
}
function toAppError(error) {
  if (isAppError(error)) {
    return error;
  }
  if (error instanceof Error) {
    return new AppError("VALIDATION_FAILED", error.message);
  }
  return new AppError("VALIDATION_FAILED", "Unknown error");
}

// src/core/validate-skill.ts
function parseFrontmatter(raw) {
  if (!raw.startsWith("---\n") && !raw.startsWith("---\r\n")) {
    throw new AppError("VALIDATION_FAILED", "Invalid frontmatter in skill.md");
  }
  const normalized = raw.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  if (lines[0] !== "---") {
    throw new AppError("VALIDATION_FAILED", "Invalid frontmatter in skill.md");
  }
  const endIndex = lines.indexOf("---", 1);
  if (endIndex === -1) {
    throw new AppError("VALIDATION_FAILED", "Invalid frontmatter in skill.md");
  }
  const metadata = {};
  for (const line of lines.slice(1, endIndex)) {
    if (!line.trim()) {
      continue;
    }
    const separatorIndex = line.indexOf(":");
    if (separatorIndex <= 0) {
      throw new AppError("VALIDATION_FAILED", "Invalid frontmatter in skill.md");
    }
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    metadata[key] = value;
  }
  return metadata;
}
async function validateSkillDirectory(skillDir) {
  const skillId = path.basename(skillDir);
  const exists = await fs.pathExists(skillDir);
  if (!exists) {
    throw new AppError("NOT_FOUND", `Skill directory not found: ${skillId}`);
  }
  const skillMdPath = path.join(skillDir, "skill.md");
  const examplesPath = path.join(skillDir, "examples.md");
  const readmePath = path.join(skillDir, "README.md");
  if (!await fs.pathExists(skillMdPath)) {
    throw new AppError("VALIDATION_FAILED", `Missing file: ${path.join(skillId, "skill.md")}`);
  }
  if (!await fs.pathExists(examplesPath)) {
    throw new AppError(
      "VALIDATION_FAILED",
      `Missing file: ${path.join(skillId, "examples.md")}`
    );
  }
  if (!await fs.pathExists(readmePath)) {
    throw new AppError("VALIDATION_FAILED", `Missing file: ${path.join(skillId, "README.md")}`);
  }
  const rawSkillMd = await fs.readFile(skillMdPath, "utf8");
  const metadata = parseFrontmatter(rawSkillMd);
  const parsed = skillMetadataSchema.safeParse(metadata);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid skill metadata";
    throw new AppError("VALIDATION_FAILED", message);
  }
  return {
    skillId,
    skillDir,
    metadata: parsed.data
  };
}

// src/core/skill-source.ts
var LocalSkillSource = class {
  sourceSkillsDir;
  constructor(options) {
    this.sourceSkillsDir = options.sourceSkillsDir;
  }
  async list() {
    if (!await fs2.pathExists(this.sourceSkillsDir)) {
      throw new Error(`Source skills directory not found: ${this.sourceSkillsDir}`);
    }
    const entries = await fs2.readdir(this.sourceSkillsDir);
    const skills = [];
    for (const entry of entries) {
      const skillDir = path2.join(this.sourceSkillsDir, entry);
      const stat = await fs2.stat(skillDir);
      if (!stat.isDirectory()) {
        continue;
      }
      const validated = await validateSkillDirectory(skillDir);
      skills.push({
        id: entry,
        name: validated.metadata.name,
        description: validated.metadata.description,
        sourcePath: skillDir
      });
    }
    return skills.sort((a, b) => a.id.localeCompare(b.id));
  }
  async get(skillId) {
    const skillDir = path2.join(this.sourceSkillsDir, skillId);
    const validated = await validateSkillDirectory(skillDir);
    return {
      id: skillId,
      name: validated.metadata.name,
      description: validated.metadata.description,
      sourcePath: skillDir
    };
  }
};

// src/utils/paths.ts
import path3 from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
var moduleDir = path3.dirname(fileURLToPath(import.meta.url));
function getPackageRootDir() {
  let current = moduleDir;
  for (let i = 0; i < 6; i += 1) {
    const packageJsonPath = path3.join(current, "package.json");
    if (existsSync(packageJsonPath)) {
      return current;
    }
    const parent = path3.resolve(current, "..");
    if (parent === current) {
      break;
    }
    current = parent;
  }
  return path3.resolve(moduleDir, "..", "..");
}
function getSourceSkillsDir() {
  return path3.resolve(getPackageRootDir(), "skills");
}
function normalizePathForOutput(value) {
  return value.replace(/\\/g, "/");
}
function isPathInside(parentDir, childPath) {
  const parent = path3.resolve(parentDir);
  const child = path3.resolve(childPath);
  const relative = path3.relative(parent, child);
  return relative === "" || !relative.startsWith("..") && !path3.isAbsolute(relative);
}

// src/core/registry.ts
var SkillRegistry = class {
  constructor(source) {
    this.source = source;
  }
  source;
  listSkills() {
    return this.source.list();
  }
  getSkill(skillId) {
    return this.source.get(skillId);
  }
  async validateSkill(skillId) {
    const skill = await this.getSkill(skillId);
    return validateSkillDirectory(skill.sourcePath);
  }
};
function createLocalRegistry(sourceSkillsDir) {
  const resolvedSourceSkillsDir = sourceSkillsDir ?? getSourceSkillsDir();
  return new SkillRegistry(
    new LocalSkillSource({
      sourceSkillsDir: resolvedSourceSkillsDir
    })
  );
}

// src/utils/logger.ts
import pc from "picocolors";
var logger = {
  info(message) {
    console.log(pc.cyan(message));
  },
  success(message) {
    console.log(pc.green(message));
  },
  warn(message) {
    console.log(pc.yellow(message));
  },
  error(message) {
    console.error(pc.red(message));
  }
};

// src/cli/commands/agents.ts
function runAgentsCommand() {
  logger.info("Agentes disponibles:\n");
  for (const agent of listAgents()) {
    console.log(`- ${agent.id}`);
    console.log(`  Ruta por defecto: ${agent.defaultTargetPath}`);
    console.log("");
  }
}

// src/core/doctor.ts
import process2 from "process";

// src/utils/fs.ts
import path4 from "path";
import fs3 from "fs-extra";
async function ensureWritableDirectory(dir) {
  await fs3.ensureDir(dir);
  const probe = path4.join(dir, `.create-skill-write-test-${Date.now()}`);
  await fs3.writeFile(probe, "ok", "utf8");
  await fs3.remove(probe);
}

// src/core/doctor.ts
async function runDoctor() {
  const cwd = process2.cwd();
  const registry = createLocalRegistry();
  const agents = listAgents();
  let writable = "OK";
  try {
    await ensureWritableDirectory(cwd);
  } catch {
    writable = "FAIL";
  }
  const skills = await registry.listSkills();
  let skillsValidation = "OK";
  for (const skill of skills) {
    try {
      await registry.validateSkill(skill.id);
    } catch {
      skillsValidation = "FAIL";
      break;
    }
  }
  return {
    node: process2.version ? "OK" : "FAIL",
    cwd: normalizePathForOutput(cwd),
    writable,
    skillsCount: skills.length,
    agentsCount: agents.length,
    skillsValidation,
    suggestedRoutes: Object.fromEntries(
      agents.map((agent) => [agent.id, normalizePathForOutput(agent.defaultTargetPath)])
    )
  };
}

// src/cli/commands/doctor.ts
async function runDoctorCommand() {
  const result = await runDoctor();
  console.log("Doctor result:\n");
  console.log(`Node: ${result.node}`);
  console.log(`Directorio actual: OK (${result.cwd})`);
  console.log(`Permisos de escritura: ${result.writable}`);
  console.log(`Skills disponibles: ${result.skillsCount}`);
  console.log(`Agentes soportados: ${result.agentsCount}`);
  console.log(`Validacion de skills: ${result.skillsValidation}`);
}

// src/cli/commands/install.ts
import { select } from "@clack/prompts";

// src/core/install-skill.ts
import path6 from "path";
import fs4 from "fs-extra";

// src/core/resolve-target-path.ts
import path5 from "path";
function resolveTargetPath(options = {}) {
  const projectRoot = options.projectRoot ?? process.cwd();
  const agentId = options.agentId ?? DEFAULT_AGENT_ID;
  if (options.customTargetPath) {
    return path5.resolve(projectRoot, options.customTargetPath);
  }
  const agent = getAgentDefinition(agentId);
  return path5.resolve(projectRoot, agent.defaultTargetPath);
}

// src/core/install-skill.ts
function resolveCopyPath(basePath, exists) {
  return async () => {
    let index = 2;
    while (true) {
      const next = `${basePath}-${index}`;
      if (!await exists(next)) {
        return next;
      }
      index += 1;
    }
  };
}
async function installSkills(options) {
  const registry = createLocalRegistry();
  if (options.all && options.skillIds.length > 0) {
    throw new AppError(
      "INVALID_ARGUMENT",
      "install --all does not accept positional skill IDs"
    );
  }
  if (!options.all && options.skillIds.length === 0) {
    throw new AppError("INVALID_ARGUMENT", "install requires skill IDs or --all");
  }
  const skills = options.all ? await registry.listSkills() : await Promise.all(options.skillIds.map((id) => registry.getSkill(id)));
  const targetRoot = resolveTargetPath({
    agentId: options.agentId,
    customTargetPath: options.target,
    projectRoot: options.projectRoot
  });
  const results = [];
  for (const skill of skills) {
    const baseTarget = path6.join(targetRoot, skill.id);
    let finalTarget = baseTarget;
    const exists = await fs4.pathExists(baseTarget);
    if (exists) {
      const strategy = options.conflictStrategy;
      if (!strategy) {
        throw new AppError(
          "CONFLICT",
          `Skill already exists at destination: ${baseTarget}`
        );
      }
      if (strategy === "cancel") {
        results.push({
          skillId: skill.id,
          sourcePath: skill.sourcePath,
          targetPath: baseTarget,
          files: ["skill.md", "examples.md", "README.md"],
          action: "skipped"
        });
        continue;
      }
      if (strategy === "copy") {
        finalTarget = await resolveCopyPath(baseTarget, (value) => fs4.pathExists(value))();
      }
    }
    const files = ["skill.md", "examples.md", "README.md"];
    if (!options.dryRun) {
      await fs4.ensureDir(path6.dirname(finalTarget));
      if (exists && options.conflictStrategy === "overwrite") {
        await fs4.remove(finalTarget);
      }
      await fs4.copy(skill.sourcePath, finalTarget);
    }
    results.push({
      skillId: skill.id,
      sourcePath: skill.sourcePath,
      targetPath: finalTarget,
      files,
      action: options.dryRun ? "dry-run" : "installed"
    });
  }
  return { items: results };
}

// src/cli/commands/install.ts
async function runInstallCommand(skillIds, options) {
  let conflictStrategy = options.conflict;
  const isInteractive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
  try {
    const result = await installSkills({
      skillIds,
      all: options.all,
      agentId: options.agent,
      target: options.target,
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
        conflictStrategy = selected;
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

// src/cli/commands/list.ts
async function runListCommand() {
  const registry = createLocalRegistry();
  const skills = await registry.listSkills();
  logger.info("Skills disponibles:\n");
  for (const skill of skills) {
    console.log(`- ${skill.id}`);
    console.log(`  ${skill.name}`);
    console.log(`  ${skill.description}`);
  }
}

// src/cli/commands/validate.ts
async function runValidateCommand(skillId, all = false) {
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
  const errors = [];
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

// src/cli/interactive.ts
async function runInteractiveMode() {
  const action = await select2({
    message: "Que quieres hacer?",
    options: [
      { value: "install", label: "Instalar skill" },
      { value: "list", label: "Listar skills" },
      { value: "agents", label: "Ver agentes" },
      { value: "validate", label: "Validar skill" },
      { value: "doctor", label: "Ejecutar doctor" }
    ]
  });
  if (action === "list") return runListCommand();
  if (action === "agents") return runAgentsCommand();
  if (action === "doctor") return runDoctorCommand();
  if (action === "validate") {
    const registry = createLocalRegistry();
    const skills = await registry.listSkills();
    const skillId = await select2({
      message: "Que skill quieres validar?",
      options: skills.map((skill) => ({ value: skill.id, label: skill.id }))
    });
    if (typeof skillId === "string") {
      await runValidateCommand(skillId, false);
    }
    return;
  }
  if (action === "install") {
    const registry = createLocalRegistry();
    const skills = await registry.listSkills();
    const selectedSkills = await multiselect({
      message: "Que skill quieres instalar?",
      options: [
        { value: "__all__", label: "Todas las skills" },
        ...skills.map((skill) => ({ value: skill.id, label: skill.id }))
      ]
    });
    const agent = await select2({
      message: "En que agente quieres instalarla?",
      initialValue: "claude",
      options: listAgents().map((item) => ({ value: item.id, label: item.label }))
    });
    if (!Array.isArray(selectedSkills) || typeof agent !== "string") {
      return;
    }
    const installAll = selectedSkills.includes("__all__");
    const useSuggested = await confirm({ message: "Quieres usar la ruta sugerida?" });
    let target;
    if (useSuggested === false) {
      const custom = await text({
        message: "Escribe la ruta destino:"
      });
      target = typeof custom === "string" ? custom : void 0;
    }
    const proceed = await confirm({ message: "Confirmas la instalacion?" });
    if (!proceed) {
      return;
    }
    await runInstallCommand(
      installAll ? [] : selectedSkills.filter((value) => value !== "__all__"),
      {
        all: installAll,
        agent,
        target
      }
    );
  }
}

// src/core/create-skill-scaffold.ts
import path7 from "path";
import fs5 from "fs-extra";
async function createSkillScaffold(skillName, targetRoot = process.cwd()) {
  const skillDir = path7.resolve(targetRoot, skillName);
  if (await fs5.pathExists(skillDir)) {
    throw new AppError("CONFLICT", `Target directory already exists: ${skillDir}`);
  }
  await fs5.ensureDir(skillDir);
  await fs5.writeFile(
    path7.join(skillDir, "skill.md"),
    [
      "---",
      `name: ${skillName.replace(/-/g, " ")}`,
      "description: Describe brevemente el proposito de esta skill.",
      "---",
      "",
      `# ${skillName.replace(/-/g, " ")}`
    ].join("\n"),
    "utf8"
  );
  await fs5.writeFile(path7.join(skillDir, "examples.md"), "# Examples\n", "utf8");
  await fs5.writeFile(path7.join(skillDir, "README.md"), `# ${skillName}
`, "utf8");
  return skillDir;
}

// src/cli/commands/create.ts
async function runCreateCommand(skillName) {
  const dir = await createSkillScaffold(skillName);
  logger.success(`Skill scaffold created at ${dir}`);
}

// src/cli/commands/remove.ts
import { confirm as confirm2 } from "@clack/prompts";

// src/core/remove-installed-skill.ts
import path8 from "path";
import fs6 from "fs-extra";
async function removeInstalledSkill(options) {
  const targetRoot = resolveTargetPath({
    agentId: options.agentId,
    customTargetPath: options.target,
    projectRoot: options.projectRoot
  });
  const targetSkillDir = path8.join(targetRoot, options.skillId);
  const sourceSkillsDir = getSourceSkillsDir();
  if (isPathInside(sourceSkillsDir, targetSkillDir)) {
    throw new AppError("OPERATION_NOT_ALLOWED", "Refusing to remove source skills directory");
  }
  if (!await fs6.pathExists(targetSkillDir)) {
    throw new AppError("NOT_FOUND", `Installed skill not found: ${options.skillId}`);
  }
  if (!options.dryRun) {
    await fs6.remove(targetSkillDir);
  }
  return targetSkillDir;
}

// src/cli/commands/remove.ts
async function runRemoveCommand(skillId, options) {
  if (!options.dryRun && !options.yes) {
    const isInteractive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
    if (!isInteractive) {
      throw new AppError(
        "INVALID_ARGUMENT",
        "Destructive remove requires confirmation in interactive mode or explicit --yes"
      );
    }
    const accepted = await confirm2({
      message: `Confirmas eliminar la skill instalada "${skillId}"?`
    });
    if (!accepted) {
      throw new AppError("USER_CANCELLED", "Operation cancelled by user");
    }
  }
  const removedPath = await removeInstalledSkill({
    skillId,
    agentId: options.agent,
    target: options.target,
    dryRun: options.dryRun
  });
  if (options.dryRun) {
    logger.info(`Dry run: se eliminaria ${removedPath}`);
  } else {
    logger.success(`Skill eliminada: ${removedPath}`);
  }
}

// src/cli/commands/update.ts
import { confirm as confirm3 } from "@clack/prompts";

// src/core/update-installed-skill.ts
import path9 from "path";
import fs7 from "fs-extra";
async function updateInstalledSkill(options) {
  const registry = createLocalRegistry();
  const sourceSkill = await registry.getSkill(options.skillId);
  const targetRoot = resolveTargetPath({
    agentId: options.agentId,
    customTargetPath: options.target,
    projectRoot: options.projectRoot
  });
  const targetSkillDir = path9.join(targetRoot, options.skillId);
  const sourceSkillsDir = getSourceSkillsDir();
  if (isPathInside(sourceSkillsDir, targetSkillDir)) {
    throw new AppError("OPERATION_NOT_ALLOWED", "Refusing to update source skills directory");
  }
  if (!await fs7.pathExists(targetSkillDir)) {
    throw new AppError(
      "NOT_FOUND",
      `Installed skill not found: ${options.skillId}. Use install instead.`
    );
  }
  if (!options.dryRun) {
    await fs7.remove(targetSkillDir);
    await fs7.copy(sourceSkill.sourcePath, targetSkillDir);
  }
  return targetSkillDir;
}

// src/cli/commands/update.ts
async function runUpdateCommand(skillId, options) {
  if (!options.dryRun && !options.yes) {
    const isInteractive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
    if (!isInteractive) {
      throw new AppError(
        "INVALID_ARGUMENT",
        "Destructive update requires confirmation in interactive mode or explicit --yes"
      );
    }
    const accepted = await confirm3({
      message: `Confirmas actualizar la skill instalada "${skillId}"?`
    });
    if (!accepted) {
      throw new AppError("USER_CANCELLED", "Operation cancelled by user");
    }
  }
  const updatedPath = await updateInstalledSkill({
    skillId,
    agentId: options.agent,
    target: options.target,
    dryRun: options.dryRun
  });
  if (options.dryRun) {
    logger.info(`Dry run: se actualizaria ${updatedPath}`);
  } else {
    logger.success(`Skill actualizada: ${updatedPath}`);
  }
}

// src/cli/program.ts
function createProgram() {
  const program = new Command();
  program.name("create-skill").description("CLI para instalar skills reutilizables").option("--debug", "Show stack traces", false);
  program.command("list").action(async () => runListCommand());
  program.command("agents").action(() => runAgentsCommand());
  program.command("validate").argument("[skillId]").option("--all", "Validate all skills").action(async (skillId, options) => {
    await runValidateCommand(skillId, Boolean(options.all));
  });
  program.command("doctor").action(async () => runDoctorCommand());
  program.command("install").argument("[skills...]").option("--agent <agent>", "Target agent").option("--target <path>", "Custom target path").option("--all", "Install all skills").option("--dry-run", "Run without writing files").option("--yes", "Skip safe confirmations").action(
    async (skills, options) => {
      if (options.agent && !AGENT_IDS.includes(options.agent)) {
        throw new AppError("INVALID_ARGUMENT", `Invalid agent: ${options.agent}`);
      }
      await runInstallCommand(skills ?? [], {
        agent: options.agent,
        target: options.target,
        all: options.all,
        dryRun: options.dryRun,
        yes: options.yes
      });
    }
  );
  program.command("create").argument("<skillName>").action(async (name) => runCreateCommand(name));
  program.command("remove").argument("<skillId>").option("--agent <agent>").option("--target <path>").option("--yes").option("--dry-run").action(async (skillId, options) => {
    if (options.agent && !AGENT_IDS.includes(options.agent)) {
      throw new AppError("INVALID_ARGUMENT", `Invalid agent: ${options.agent}`);
    }
    await runRemoveCommand(skillId, options);
  });
  program.command("update").argument("<skillId>").option("--agent <agent>").option("--target <path>").option("--dry-run").option("--yes").action(async (skillId, options) => {
    if (options.agent && !AGENT_IDS.includes(options.agent)) {
      throw new AppError("INVALID_ARGUMENT", `Invalid agent: ${options.agent}`);
    }
    await runUpdateCommand(skillId, options);
  });
  program.action(async () => {
    await runInteractiveMode();
  });
  return program;
}
async function runCli(argv) {
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

// src/index.ts
var exitCode = await runCli(process.argv);
if (exitCode !== 0) {
  process.exitCode = exitCode;
}
//# sourceMappingURL=index.js.map