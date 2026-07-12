import { Response } from "express";
import setCookieConfig from "./setCookieConfig";

function setCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
  deviceId: string,
) {
  res.clearCookie("access_token");
  res.cookie("access_token", accessToken, setCookieConfig("access_token"));

  res.clearCookie("refresh_token");
  res.cookie("refresh_token", refreshToken, setCookieConfig("refresh_token"));

  res.cookie("device_id", deviceId, setCookieConfig("device_id"));
}

export default setCookies;
