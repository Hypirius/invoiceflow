class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code: string;
  errorName?: string;
  errors?: Record<any, any>;
  details?: string;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    isOperational = true,
    errorName = "AppError",
    errors?: Record<any, any>,
    details?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = errorName;
    this.code = code;
    this.isOperational = isOperational;
    if (details) {
      this.details = details;
    }
    if (errors) {
      this.errors = errors;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
