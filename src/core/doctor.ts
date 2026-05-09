import process from "node:process";
import { listAgents } from "./agents";
import { createLocalRegistry } from "./registry";
import { ensureWritableDirectory } from "../utils/fs";
import { normalizePathForOutput } from "../utils/paths";

export interface DoctorResult {
  node: "OK" | "FAIL";
  cwd: string;
  writable: "OK" | "FAIL";
  skillsCount: number;
  agentsCount: number;
  skillsValidation: "OK" | "FAIL";
  suggestedRoutes: Record<string, string>;
}

export async function runDoctor(): Promise<DoctorResult> {
  const cwd = process.cwd();
  const registry = createLocalRegistry();
  const agents = listAgents();

  let writable: "OK" | "FAIL" = "OK";
  try {
    await ensureWritableDirectory(cwd);
  } catch {
    writable = "FAIL";
  }

  const skills = await registry.listSkills();
  let skillsValidation: "OK" | "FAIL" = "OK";
  for (const skill of skills) {
    try {
      await registry.validateSkill(skill.id);
    } catch {
      skillsValidation = "FAIL";
      break;
    }
  }

  return {
    node: process.version ? "OK" : "FAIL",
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
