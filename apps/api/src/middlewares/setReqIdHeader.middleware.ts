import { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";

function setRequestIdHeader() {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestId = req.get("Request-Id") || randomUUID();

    req.headers["Request-Id"] = requestId;

    res.header("Request-Id", requestId);
  };
}

export default setRequestIdHeader;
