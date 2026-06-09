import { Request, Response } from "express";
import signUpService from "./signUp.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import setCookieConfig from "../utils/setCookieConfig";
import publishRefreshTokenService from "./publishRefreshToken.service";
import getRefreshTokenDetails from "../utils/getRefreshTokenDetails";

async function signUpController(req: Request, res: Response) {
  const { data, accessToken, userId } = await signUpService(req.body);

  const tokenDetails = await getRefreshTokenDetails(req, userId);

  const refreshToken = await publishRefreshTokenService(tokenDetails);

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
