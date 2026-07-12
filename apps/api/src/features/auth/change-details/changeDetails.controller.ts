import { Request, Response } from "express";
import changeDetailsService from "./changeDetails.service";
import readJwtPayload from "@/utils/readJwtPayload";
import setCookies from "../utils/setCookies";
import publishRefreshTokenService from "../publish-refresh-token/publishRefreshToken.service";

async function changeDetailsController(req: Request, res: Response) {
  const { sub } = readJwtPayload(req.headers);

  const accessToken = await changeDetailsService(req.body, sub);

  const { token, deviceId } = await publishRefreshTokenService(req, sub);

  setCookies(res, accessToken, token, deviceId);

  res.status(204).end();
}

export default changeDetailsController;
