import { Request, Response } from "express";
import signUpService from "./signUp.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import config from "@/config/env";
import convertTimeValue from "../../../utils/convertTimeValue";
import ms from "ms";

async function signUpController(req: Request, res: Response) {
  const result = await signUpService(req.body);

  res.cookie("session_token", result.jwt.refreshToken, {
    httpOnly: true,
    maxAge: convertTimeValue(config.JWT_REFRESH_EXPIRES_IN as ms.StringValue),
  });

  res.status(201).json(
    new ApiSuccessResponse({
      message: "User successfully created",
      ...result.data,
      accessToken: result.jwt.accessToken,
    }),
  );
}

export default signUpController;
