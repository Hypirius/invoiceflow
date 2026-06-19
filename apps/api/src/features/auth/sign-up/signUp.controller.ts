import { Request, Response } from "express";
import signUpService from "./signUp.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import setCookieConfig from "../utils/setCookieConfig";
import publishRefreshTokenService from "./publishRefreshToken.service";
import getRefreshTokenDetails from "../utils/getRefreshTokenDetails";

async function signUpController(req: Request, res: Response) {
  const { data, accessToken, userId } = await signUpService(req.body);

  const tokenDetails = await getRefreshTokenDetails(req, userId);

  await publishRefreshTokenService(tokenDetails);

  res.clearCookie("refresh_token");
  res.cookie("refresh_token", tokenDetails.token, setCookieConfig());

  res.status(201).json(
    new ApiSuccessResponse("User successfully created", {
      ...data,
      accessToken,
      deviceId: tokenDetails.deviceId,
    }),
  );
}

export default signUpController;
