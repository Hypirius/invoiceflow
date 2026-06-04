import { Request, Response } from "express";
import loginService from "./login.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import setCookieConfig from "../utils/setCookieConfig";

async function loginController(req: Request, res: Response) {
  const result = await loginService(req.body);

  res.clearCookie("session_token");
  res.cookie("session_token", result.jwt.refreshToken, setCookieConfig());

  res.status(200).json(
    new ApiSuccessResponse("User has been logged in successfully.", {
      ...result.data,
      accessToken: result.jwt.accessToken,
    }),
  );
}

export default loginController;
