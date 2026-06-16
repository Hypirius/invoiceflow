import z from "zod";
import { DBTokenMismatch, TokenExpiredError } from "../utils/ErrorClass";
import {
  findRefreshTokenByUserAndDeviceId,
  updateRefreshToken,
  updateRefreshTokenOldToken,
} from "./accessToken.repository";
import { generateAccessToken } from "../utils/generateJWT";
import generateRefreshTokenHash from "../utils/generateRefreshTokenHash";
import validateSchema from "../utils/validateSchema";
import decryptJWT from "../utils/decryptJWT";

async function accessTokenService(
  accessToken: string,
  refreshToken: string,
  deviceId: string,
) {
  validateSchema(z.jwt(), accessToken);

  const {
    payload: { sub, email, displayName, role },
  } = await decryptJWT(accessToken);

  const findResult = await findRefreshTokenByUserAndDeviceId(sub, deviceId);

  if (
    findResult.expiresAt &&
    Date.now() > findResult.expiresAt.getMilliseconds()
  ) {
    throw new TokenExpiredError();
  }

  if (findResult.token !== refreshToken) {
    throw new DBTokenMismatch();
  }

  await updateRefreshTokenOldToken(sub, deviceId, findResult.token);

  const newAccessToken = await generateAccessToken({
    sub,
    email,
    displayName,
    role,
  });

  const newRefreshToken = await generateRefreshTokenHash();

  await updateRefreshToken(sub, deviceId, newRefreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export default accessTokenService;
