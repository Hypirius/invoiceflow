import { Request, Response } from "express";
import googleOauthCallbackService from "./googleOauthCallback.service";
import publishRefreshTokenService from "@/features/auth/sign-up/publishRefreshToken.service";
import getRefreshTokenDetails from "@/features/auth/utils/getRefreshTokenDetails";
import setCookieConfig from "@/features/auth/utils/setCookieConfig";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";

type CallbackRequestQueryType = {
  code: string;
  state: string;
  codeVerifier: string;
};

async function googleOauthCallbackController(
  req: Request<{}, {}, {}, CallbackRequestQueryType>,
  res: Response,
) {
  const { code, state, codeVerifier } = req.query;

  const { clientState } = req.cookies["google_oauth_token"];

  const { userId, accessToken } = await googleOauthCallbackService(
    code,
    codeVerifier,
    state,
    clientState,
  );

  const tokenDetails = await getRefreshTokenDetails(req, userId);
  await publishRefreshTokenService(tokenDetails);

  res.clearCookie("refresh_token");
  res.cookie("refresh_token", tokenDetails.token, setCookieConfig());

  res.status(201).json(
    new ApiSuccessResponse("User successfully created with google oauth", {
      accessToken,
    }),
  );
}

export default googleOauthCallbackController;
