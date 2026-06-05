import { ValidationError } from "@/lib/errors/ErrorClasses";
import z from "zod";
import {
  DBTokenMismatch,
  TokenExpiredError,
  TokenUserNotExistsError,
} from "../utils/ErrorClass";
import {
  findRefreshTokenById,
  updateDBRefreshToken,
} from "./accessToken.repository";
import { generateDualTokens } from "../utils/generateJWT";
import decryptJWT from "../utils/decryptJWT";

const isJwtSchema = z.jwt({
  message: "Incorrect token is sent, not valid string value",
});

async function accessTokenService(refreshToken: string) {
  const validation = isJwtSchema.safeParse(refreshToken);

  if (!validation.success) {
    throw new ValidationError(validation.error.issues);
  }

  const {
    payload: { exp, sub, email, displayName, role },
  } = await decryptJWT(refreshToken);

  if (exp && exp > Date.now()) {
    throw new TokenExpiredError();
  }

  const findResult = await findRefreshTokenById(sub);

  if (!findResult) {
    throw new TokenUserNotExistsError();
  }

  if (findResult.refreshToken !== refreshToken) {
    throw new DBTokenMismatch();
  }

  const tokens = await generateDualTokens({
    sub,
    email,
    displayName,
    role,
  });
  await updateDBRefreshToken(sub, tokens.refreshToken);

  return tokens;
}

export default accessTokenService;
