import { Request, Response } from "express";
import signUpService from "./signUp.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import publishRefreshTokenService from "../publish-refresh-token/publishRefreshToken.service";
import setCookies from "../utils/setCookies";

async function signUpController(req: Request, res: Response) {
  const { data, accessToken, userId } = await signUpService(req.body);

  const { token, deviceId } = await publishRefreshTokenService(req, userId);

  setCookies(res, accessToken, token, deviceId);

  res.status(201).json(
    new ApiSuccessResponse("User successfully created", {
      ...data,
      accessToken,
      deviceId,
    }),
  );
}

export default signUpController;
