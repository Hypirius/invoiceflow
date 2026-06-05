import { Request, Response } from "express";
import accessTokenService from "./accessToken,service";
import setCookieConfig from "../utils/setCookieConfig";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";

async function accessTokenController(req: Request, res: Response) {
  const oldRefreshToken = req.signedCookies.session_cookie;

  const { refreshToken: newRefreshToken, accessToken } =
    await accessTokenService(oldRefreshToken);

  res.clearCookie("session_cookie");
  res.cookie("session_cookie", newRefreshToken, setCookieConfig());

  res.status(201).json(
    new ApiSuccessResponse("Access token is successfully generated", {
      accessToken,
    }),
  );
}

export default accessTokenController;
