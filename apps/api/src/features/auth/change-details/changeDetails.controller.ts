import { NextFunction, Request, Response } from "express";
import changeDetailsService from "./changeDetails.service";
import ApiSuccessResponse from "@/utils/ApiSuccessResponse";
import readJwtPayload from "@/utils/readJwtPayload";

async function changeDetailsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const tokenPayload = readJwtPayload(req.headers);
  const result = await changeDetailsService(req.body, tokenPayload.sub);

  res
    .status(200)
    .json(new ApiSuccessResponse("Successfully changed user details", result));
}

export default changeDetailsController;
