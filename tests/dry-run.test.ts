import os from "node:os";
import path from "node:path";
import fs from "fs-extra";
import { afterEach, describe, expect, it } from "vitest";
import { installSkills } from "../src/core/install-skill";
import { normalizeForSnapshot } from "./helpers/normalize";

const tempRoots: string[] = [];

afterEach(async () => {
  for (const root of tempRoots) {
    await fs.remove(root);
  }
  tempRoots.length = 0;
});

describe("dry-run", () => {
  it("does not create files on install dry-run", async () => {
    const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "dry-run-install-"));
    tempRoots.push(tempRoot);

    const result = await installSkills({
      skillIds: ["skill-apple-ui"],
      dryRun: true,
      projectRoot: tempRoot
    });

    const targetPath = result.items[0]!.targetPath;
    expect(await fs.pathExists(targetPath)).toBe(false);

    const item = result.items[0]!;
    const normalizedItem = {
      ...item,
      sourcePath: "<SOURCE_SKILL>",
      targetPath: "<TARGET_SKILL>"
    };
    expect(normalizeForSnapshot(JSON.stringify(normalizedItem, null, 2))).toMatchSnapshot();
  });
});
