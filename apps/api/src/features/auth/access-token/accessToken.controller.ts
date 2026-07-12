import { Request, Response } from "express";
import accessTokenService from "./accessToken.service";
import publishRefreshTokenService from "../publish-refresh-token/publishRefreshToken.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";

async function accessTokenController(req: Request, res: Response) {
  const {
    newAccessToken,
    refreshTokenDetails: { oldRefreshToken, oldExpiresAt },
    userId,
  } = await accessTokenService(req.body);

  const { token } = await publishRefreshTokenService(req, userId, {
    oldToken: oldRefreshToken,
    oldExpiresAt,
  });

  return res.status(201).json(
    new ApiSuccessResponse("Successfully refreshed tokens", {
      newAccessToken,
      refreshTokenDetails: {
        token,
        maxAge: (oldExpiresAt.getTime() - Date.now()) / 1000,
      },
    }),
  );
}

export default accessTokenController;
