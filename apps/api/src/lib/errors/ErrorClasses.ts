import AppError from "./AppError";
import { globalErrorStates } from "./errorStates";
import { $ZodIssue } from "zod/v4/core";

class ForbiddenError extends AppError {
  constructor() {
    super(
      globalErrorStates.FORBIDDEN_ERR.message,
      403,
      globalErrorStates.FORBIDDEN_ERR.code,
      true,
      "ForbiddenError",
    );
  }
}

class ValidationError extends AppError {
  constructor(errors: $ZodIssue[]) {
    super(
      globalErrorStates.VALIDATION_ERR.message,
      400,
      globalErrorStates.VALIDATION_ERR.code,
      true,
      "ValidationError",
      errors,
    );
  }
}

export { ForbiddenError, ValidationError };
