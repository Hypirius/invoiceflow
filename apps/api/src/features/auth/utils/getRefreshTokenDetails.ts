import { Request } from "express";
import generateJWTExpiryTime from "./generateJWTExpiryTime";
import config from "@/config/env";
import generateRefreshTokenHash from "./generateRefreshTokenHash";

async function getRefreshTokenDetails(
  req: Request,
  userId: string,
  oldToken: string | null = null,
) {
  return {
    oldToken,
    userId,
    token: await generateRefreshTokenHash(),
    ipAddress: req.ip || null,
    userAgent: req.headers["user-agent"] || null,
    expiresAt: generateJWTExpiryTime(config.JWT_ACCESS_EXPIRES_IN),
  };
}

export default getRefreshTokenDetails;
