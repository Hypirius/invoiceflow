import { Request, Response } from "express";
import loginService from "./login.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import setCookieConfig from "../utils/setCookieConfig";
import publishRefreshTokenService from "../sign-up/publishRefreshToken.service";
import getRefreshTokenDetails from "../utils/getRefreshTokenDetails";

async function loginController(req: Request, res: Response) {
  const { data, accessToken, userId } = await loginService(req.body);

  const tokenDetails = await getRefreshTokenDetails(req, userId);

  await publishRefreshTokenService(tokenDetails);

  res.clearCookie("session_token");
  res.cookie("session_token", tokenDetails.token, setCookieConfig());

  res.status(200).json(
    new ApiSuccessResponse("User has been logged in successfully.", {
      ...data,
      accessToken: accessToken,
    }),
  );
}

export default loginController;
