import { Request, Response } from "express";
import signUpService from "./signUp.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import setCookieConfig from "../utils/setCookieConfig";

async function signUpController(req: Request, res: Response) {
  const result = await signUpService(req.body);

  res.clearCookie("session_token");
  res.cookie("session_token", result.jwt.refreshToken, setCookieConfig());

  res.status(201).json(
    new ApiSuccessResponse("User successfully created", {
      ...result.data,
      accessToken: result.jwt.accessToken,
    }),
  );
}

export default signUpController;
