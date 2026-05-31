import { NextFunction, Request, Response } from "express";
import config from "../config/env";

function allowedClients() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!config.WHITELIST_CLIENTS.includes(req.url)) {
      res.send({ error: "Forbidden, client is not whitelisted" }).status(403);
    }

    next();
  };
}

export default allowedClients;
