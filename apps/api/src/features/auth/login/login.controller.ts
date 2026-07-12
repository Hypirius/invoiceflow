import { Request, Response } from "express";
import loginService from "./login.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import publishRefreshTokenService from "../publish-refresh-token/publishRefreshToken.service";
import setCookies from "../utils/setCookies";

async function loginController(req: Request, res: Response) {
  const { data, accessToken, userId } = await loginService(req.body);

  const { token, deviceId } = await publishRefreshTokenService(req, userId);

  setCookies(res, accessToken, token, deviceId);

  res.status(200).json(
    new ApiSuccessResponse("User has been logged in successfully.", {
      ...data,
    }),
  );
}

export default loginController;
