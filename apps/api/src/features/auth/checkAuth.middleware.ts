import z from "zod";
import {
  AuthenicationFailedError,
  TokenDecryptionFailedError,
  TokenExpiredError,
  TokenInvalidError,
} from "../auth/utils/ErrorClass";
import { NextFunction, Request, Response } from "express";
import verifyJWT from "./utils/decryptJWT";
import { JWEInvalid, JWSInvalid } from "jose/errors";

function checkAuth() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token;

    const validateToken = z.string().safeParse(accessToken);

    if (!validateToken.success) {
      return next(new AuthenicationFailedError(validateToken.error.issues));
    }

    try {
      const { payload } = await verifyJWT(accessToken as string);

      if (payload.exp && Date.now() > payload.exp * 1000) {
        return next(new TokenExpiredError());
      }

      req.headers["jwt-payload"] = JSON.stringify(payload);
    } catch (err) {
      if (err instanceof JWEInvalid) {
        return next(new TokenDecryptionFailedError());
      } else if (err instanceof JWSInvalid) {
        return next(new TokenInvalidError());
      }

      return next(err);
    }

    next();
  };
}

export default checkAuth;
