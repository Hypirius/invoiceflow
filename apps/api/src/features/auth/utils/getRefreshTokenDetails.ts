import { Request } from "express";
import generateExpiryTime from "../../../utils/generateExpiryTime";
import config from "@/config/env";
import generateRefreshTokenHash from "./generateRefreshTokenHash";
import { randomUUID } from "crypto";

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
    expiresAt: new Date(generateExpiryTime(config.JWT_ACCESS_EXPIRES_IN)),
    deviceId: randomUUID(),
  };
}

export default getRefreshTokenDetails;
