import path from "node:path";
import fs from "fs-extra";
import { AppError } from "../utils/errors";

export async function createSkillScaffold(skillName: string, targetRoot = process.cwd()) {
  const skillDir = path.resolve(targetRoot, skillName);
  if (await fs.pathExists(skillDir)) {
    throw new AppError("CONFLICT", `Target directory already exists: ${skillDir}`);
  }

  await fs.ensureDir(skillDir);
  await fs.writeFile(
    path.join(skillDir, "skill.md"),
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
  await fs.writeFile(path.join(skillDir, "examples.md"), "# Examples\n", "utf8");
  await fs.writeFile(path.join(skillDir, "README.md"), `# ${skillName}\n`, "utf8");

  return skillDir;
}
