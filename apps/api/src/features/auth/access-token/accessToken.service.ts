import {
  DBTokenMismatch,
  OldTokenDetectedError,
  TokenExpiredError,
} from "../utils/ErrorClass";
import {
  findDetailsByRefreshToken,
  invalidateAllUserRefreshTokens,
} from "./accessToken.repository";
import { generateAccessToken } from "../utils/generateJWT";
import validateSchema from "../utils/validateSchema";
import accessTokenServiceSchema from "./accessToken.schema";

type DataType = {
  oldRefreshToken: string;
  deviceId: string;
};

async function accessTokenService(data: DataType) {
  const { oldRefreshToken } = validateSchema(accessTokenServiceSchema, data);

  const {
    token,
    expiresAt,
    oldToken,
    user: { id, email, displayName, fullName, role },
  } = await findDetailsByRefreshToken(oldRefreshToken);
  console.log(expiresAt);

  if (token !== oldRefreshToken) {
    throw new DBTokenMismatch();
  }

  if (oldToken && oldRefreshToken === oldToken) {
    await invalidateAllUserRefreshTokens(id);
    throw new OldTokenDetectedError();
  }

  if (Date.now() > expiresAt.getTime()) {
    throw new TokenExpiredError();
  }

  const newAccessToken = await generateAccessToken({
    sub: id,
    email,
    displayName: displayName || fullName,
    role,
  });

  return {
    newAccessToken,
    refreshTokenDetails: {
      oldRefreshToken,
      oldExpiresAt: expiresAt,
    },
    userId: id,
  };
}

export default accessTokenService;
