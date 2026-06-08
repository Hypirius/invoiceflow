import { Request, Response } from "express";
import signUpService from "./signUp.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import setCookieConfig from "../utils/setCookieConfig";
import config from "@/config/env";
import generateJWTExpiryTime from "../utils/generateJWTExpiryTime";
import publishRefreshTokenService from "./publishRefreshToken.service";

async function signUpController(req: Request, res: Response) {
  const {
    data,
    tokens: { accessToken, refreshToken },
  } = await signUpService(req.body);

  const tokenDetails = {
    oldToken: null,
    token: refreshToken,
    userId: data.userId,
    ipAddress: req.ip || null,
    userAgent: req.headers["user-agent"] || null,
    expiresAt: generateJWTExpiryTime(config.JWT_ACCESS_EXPIRES_IN),
  };

  await publishRefreshTokenService(tokenDetails);

  res.clearCookie("session_token");
  res.cookie("session_token", refreshToken, setCookieConfig());

  res.status(201).json(
    new ApiSuccessResponse("User successfully created", {
      ...data,
      accessToken,
    }),
  );
}

export default signUpController;
