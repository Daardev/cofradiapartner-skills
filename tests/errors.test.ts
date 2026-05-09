import { describe, expect, it } from "vitest";
import { AppError, isAppError, toAppError } from "../src/utils/errors";

describe("errors", () => {
  it("detects AppError", () => {
    const error = new AppError("NOT_FOUND", "missing");
    expect(isAppError(error)).toBe(true);
  });

  it("normalizes unknown errors", () => {
    const error = toAppError(new Error("boom"));
    expect(error.code).toBe("VALIDATION_FAILED");
    expect(error.message).toBe("boom");
  });
});
