import "server-only";
import { JWTDataType } from "@repo/shared/types/JwtPayload.js";
import { jwtVerify } from "jose";
import { JWTInvalid, JWSInvalid } from "jose/errors";

const uint8SecretArray = new TextEncoder().encode(
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  process.env.JWT_SECRET_KEY as string,
);

async function verifyJwt(accessToken: string) {
  let isError: boolean = false;
  let error: string | null = null;
  let data: JWTDataType | null = null;

  try {
    const { payload } = await jwtVerify<JWTDataType>(
      accessToken,
      uint8SecretArray,
    );

    data = payload;
  } catch (err) {
    isError = true;
    if (err instanceof JWTInvalid || err instanceof JWSInvalid) {
      error = err.message;
    }

    error = "Unknown details parsing error";
  }

  return {
    isError,
    error,
    data,
  };
}

export default verifyJwt;
