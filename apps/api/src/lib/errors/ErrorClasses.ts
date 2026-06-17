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
  constructor(errors?: $ZodIssue[]) {
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

class EmailServiceError extends AppError {
  constructor() {
    super(
      globalErrorStates.EMAIL_SERVICE_ERR.message,
      500,
      globalErrorStates.EMAIL_SERVICE_ERR.code,
      true,
      "EmailServiceError",
    );
  }
}

class InternalServerError extends AppError {
  constructor() {
    super(
      globalErrorStates.INTERNAL_SERVER.message,
      500,
      globalErrorStates.INTERNAL_SERVER.code,
      true,
      "InternalServerError",
    );
  }
}

export {
  ForbiddenError,
  ValidationError,
  EmailServiceError,
  InternalServerError,
};
