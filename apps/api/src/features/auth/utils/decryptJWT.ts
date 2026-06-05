import { jwtDecrypt } from "jose";
import { JwtPayloadType } from "../types";
import config from "@/config/env";
import { JWEDecryptionFailed, JWEInvalid } from "jose/errors";
import { TokenDecryptionFailedError, TokenInvalidError } from "./ErrorClass";

async function decryptJWT(token: string) {
  try {
    return await jwtDecrypt<JwtPayloadType>(token, config.JWT_SECRET_KEY);
  } catch (err) {
    if (err instanceof JWEDecryptionFailed) {
        throw new TokenDecryptionFailedError()
    } else if (err instanceof JWEInvalid) {
        throw new TokenInvalidError()
    } else {
      throw err;
    }
  }
}

export default decryptJWT;
