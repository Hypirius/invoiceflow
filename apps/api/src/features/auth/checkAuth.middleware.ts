import z from "zod";
import {
  AuthenicationFailedError,
  TokenExpiredError,
} from "../auth/utils/ErrorClass";
import { NextFunction, Request, Response } from "express";
import decryptJWT from "./utils/decryptJWT";

function checkAuth() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    const validateToken = z.jwt().safeParse(accessToken);

    if (!validateToken.success) {
      return next(new AuthenicationFailedError(validateToken.error.issues));
    }

    const {
      payload: { exp },
    } = await decryptJWT(accessToken as string);

    if (exp && exp > Date.now()) {
      return next(new TokenExpiredError());
    }

    req.headers["jwt-payload"] = JSON.stringify("jwt-payload");

    next();
  };
}

export default checkAuth;
