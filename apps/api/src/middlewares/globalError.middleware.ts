import { NextFunction, Request, Response } from "express";
import AppError from "../lib/errors/AppError";
import { globalErrorStates } from "../lib/errors/errorStates";

type ApiErrorResType = {
  success: boolean;
  message: string;
  code: string;
  details?: string;
  errors?: Record<any, any>;
};

function globalErrorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let ApiErrorRes: ApiErrorResType;

  if (err instanceof AppError) {
    ApiErrorRes = {
      success: false,
      message: err.message,
      code: err.code,
    };

    if (err.details) {
      ApiErrorRes.details = err.details;
    }

    if (err.errors) {
      ApiErrorRes.errors = err.errors;
    }

    res.status(err.statusCode).json(ApiErrorRes);
    return;
  } else {
    ApiErrorRes = {
      success: false,
      message: globalErrorStates.INTERNAL_SERVER.message,
      code: globalErrorStates.INTERNAL_SERVER.code,
    };
    res.status(500).json(ApiErrorRes);
  }
}

// TODO: Add logger support

export default globalErrorMiddleware;
