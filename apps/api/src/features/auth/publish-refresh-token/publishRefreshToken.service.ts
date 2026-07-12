import { Request } from "express";
import {
  createRefreshToken,
  RefreshTokenType,
} from "./publishRefreshToken.repository";
import getRefreshTokenDetails from "../utils/getRefreshTokenDetails";

async function publishRefreshTokenService(
  req: Request,
  userId: string,
  oldTokenDetails?: {
    oldToken: string;
    oldExpiresAt: Date;
  },
) {
  const data = await getRefreshTokenDetails({
    userId,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    deviceId: req.cookies["device_id"],
    oldTokenDetails,
  });
  return (await createRefreshToken(data)) as RefreshTokenType;
}

export default publishRefreshTokenService;
