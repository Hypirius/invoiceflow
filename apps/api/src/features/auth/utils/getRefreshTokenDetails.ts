import { cookieConfig } from "@repo/shared/constants/cookieConfig.js";
import generateRefreshTokenHash from "./generateRefreshTokenHash";
import { randomUUID } from "crypto";

type getRefreshTokenDetailsType = {
  userId: string;
  deviceId?: string;
  ip?: string | null;
  userAgent?: string | null;
  oldTokenDetails?: {
    oldToken: string;
    oldExpiresAt: Date;
  };
};

async function getRefreshTokenDetails({
  userId,
  deviceId,
  ip = null,
  userAgent = null,
  oldTokenDetails,
}: getRefreshTokenDetailsType) {
  return {
    oldToken: oldTokenDetails?.oldToken || null,
    userId,
    token: await generateRefreshTokenHash(),
    ipAddress: ip,
    userAgent,
    expiresAt:
      oldTokenDetails?.oldExpiresAt ||
      new Date(Date.now() + cookieConfig.refresh_token.maxAge),
    deviceId: (deviceId as string) ?? randomUUID(),
  };
}

export default getRefreshTokenDetails;
