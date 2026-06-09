import { Request } from "express";
import generateExpiryTime from "./generateExpiryTime";
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
    expiresAt: generateExpiryTime(config.JWT_ACCESS_EXPIRES_IN),
  };
}

export default getRefreshTokenDetails;
