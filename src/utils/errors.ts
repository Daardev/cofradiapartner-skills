export type ErrorCode =
  | "INVALID_ARGUMENT"
  | "NOT_FOUND"
  | "VALIDATION_FAILED"
  | "CONFLICT"
  | "PERMISSION_DENIED"
  | "USER_CANCELLED"
  | "OPERATION_NOT_ALLOWED";

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly details?: string[];

  constructor(code: ErrorCode, message: string, details?: string[]) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError("VALIDATION_FAILED", error.message);
  }

  return new AppError("VALIDATION_FAILED", "Unknown error");
}
