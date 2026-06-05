import { AuthenicationFailedError } from "@/lib/errors/ErrorClasses";
import { NextFunction, Request, Response } from "express";

async function checkAuth(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return next(new AuthenicationFailedError());
  }

  next();
}

export default checkAuth;
