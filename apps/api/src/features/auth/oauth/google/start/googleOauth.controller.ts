import { Request, Response } from "express";
import googleOauthStartService from "./googleOauthStart.service";

async function googleOauthController(req: Request, res: Response) {
  const { url, state } = googleOauthStartService();

  res.clearCookie("google_oauth_token");
  res.cookie(
    "google_oauth_token",
    {
      state,
    },
    {
      httpOnly: true,
    },
  );

  res.status(302).redirect(url.href);
}

export default googleOauthController;
