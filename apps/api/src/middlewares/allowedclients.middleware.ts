import { NextFunction, Request, Response } from "express";
import config from "../config/env";
import { ForbiddenError } from "@/lib/errors/ErrorClasses";

function allowedClients() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!config.WHITELIST_CLIENTS.includes(req.url)) {
      return next(new ForbiddenError());
    }

    next();
  };
}

export default allowedClients;
