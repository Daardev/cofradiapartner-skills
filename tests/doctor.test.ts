import { describe, expect, it } from "vitest";
import { runDoctor } from "../src/core/doctor";

describe("doctor", () => {
  it("reports basic environment checks", async () => {
    const result = await runDoctor();
    expect(result.node).toBe("OK");
    expect(result.cwd.length).toBeGreaterThan(0);
    expect(result.skillsCount).toBeGreaterThanOrEqual(1);
    expect(result.localSkillsPath).toBe(".agents/skills");
    expect(result.globalSkillsPath.length).toBeGreaterThan(0);
  });
});
