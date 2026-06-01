import { NextFunction, Request, Response } from "express";
import AppError from "../lib/errors/AppError";

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

    res.status(err.statusCode).send(ApiErrorRes);
    return;
  } else {
    ApiErrorRes = {
      success: false,
      message: "An internal server error occured",
      code: "INTERNAL_SERVER_ERR",
    };
    res.status(500).send(ApiErrorRes);
  }
}

// TODO: Add logger support

export default globalErrorMiddleware;
