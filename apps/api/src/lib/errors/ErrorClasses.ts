import AppError from "./AppError";
import { globalErrorStates } from "./errorStates";

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

export { ForbiddenError };
