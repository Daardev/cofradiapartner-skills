import path from "node:path";
import fs from "fs-extra";
import { skillMetadataSchema, type SkillMetadata } from "../schemas/skill.schema";
import { AppError } from "../utils/errors";

export interface SkillValidationResult {
  skillId: string;
  skillDir: string;
  metadata: SkillMetadata;
}

function parseFrontmatter(raw: string): Record<string, string> {
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

  const metadata: Record<string, string> = {};
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

export async function validateSkillDirectory(
  skillDir: string
): Promise<SkillValidationResult> {
  const skillId = path.basename(skillDir);

  const exists = await fs.pathExists(skillDir);
  if (!exists) {
    throw new AppError("NOT_FOUND", `Skill directory not found: ${skillId}`);
  }

  const skillMdPath = path.join(skillDir, "skill.md");
  const examplesPath = path.join(skillDir, "examples.md");
  const readmePath = path.join(skillDir, "README.md");

  if (!(await fs.pathExists(skillMdPath))) {
    throw new AppError("VALIDATION_FAILED", `Missing file: ${path.join(skillId, "skill.md")}`);
  }
  if (!(await fs.pathExists(examplesPath))) {
    throw new AppError(
      "VALIDATION_FAILED",
      `Missing file: ${path.join(skillId, "examples.md")}`
    );
  }
  if (!(await fs.pathExists(readmePath))) {
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

export { parseFrontmatter };
