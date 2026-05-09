import { describe, expect, it } from "vitest";
import { runCli } from "../src/cli/program";

describe("CLI contract", () => {
  it("fails install with --all and positional IDs", async () => {
    const code = await runCli([
      "node",
      "create-skill",
      "install",
      "skill-apple-ui",
      "--all"
    ]);
    expect(code).toBe(1);
  });

  it("fails install without IDs and without --all", async () => {
    const code = await runCli(["node", "create-skill", "install"]);
    expect(code).toBe(1);
  });

  it("fails validate --all with positional id", async () => {
    const code = await runCli([
      "node",
      "create-skill",
      "validate",
      "skill-apple-ui",
      "--all"
    ]);
    expect(code).toBe(1);
  });

  it("fails invalid agent", async () => {
    const code = await runCli([
      "node",
      "create-skill",
      "install",
      "skill-apple-ui",
      "--agent",
      "unknown"
    ]);
    expect(code).toBe(1);
  });
});
