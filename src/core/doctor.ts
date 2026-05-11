import process from "node:process";
import { createLocalRegistry } from "./registry";
import { ensureWritableDirectory } from "../utils/fs";
import {
  DEFAULT_LOCAL_SKILLS_DIR,
  getGlobalSkillsDir,
  normalizePathForOutput
} from "../utils/paths";

export interface DoctorResult {
  node: "OK" | "FAIL";
  cwd: string;
  writable: "OK" | "FAIL";
  skillsCount: number;
  skillsValidation: "OK" | "FAIL";
  localSkillsPath: string;
  globalSkillsPath: string;
}

export async function runDoctor(): Promise<DoctorResult> {
  const cwd = process.cwd();
  const registry = createLocalRegistry();

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
    skillsValidation,
    localSkillsPath: normalizePathForOutput(DEFAULT_LOCAL_SKILLS_DIR),
    globalSkillsPath: normalizePathForOutput(getGlobalSkillsDir())
  };
}
