import { jwtVerify } from "jose";
import { JwtPayloadType } from "../types";
import config from "@/config/env";
import { JWEDecryptionFailed, JWEInvalid, JWTExpired } from "jose/errors";
import {
  TokenDecryptionFailedError,
  TokenExpiredError,
  TokenInvalidError,
} from "./ErrorClass";

async function verifyJWT(token: string) {
  try {
    return await jwtVerify<JwtPayloadType>(token, config.JWT_SECRET_KEY);
  } catch (err) {
    if (err instanceof JWTExpired) {
      throw new TokenExpiredError();
    } else if (err instanceof JWEDecryptionFailed) {
      throw new TokenDecryptionFailedError();
    } else if (err instanceof JWEInvalid) {
      throw new TokenInvalidError();
    } else {
      throw err;
    }
  }
}

export default verifyJWT;
