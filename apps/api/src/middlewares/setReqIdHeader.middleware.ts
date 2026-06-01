import { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";

function setRequestIdHeader() {
  return (req: Request, res: Response, next: NextFunction) => {
    const requestId = req.header("Request-Id") || randomUUID();

    req.headers["request-id"] = requestId;

    res.header("Request-Id", requestId);
  };
}

export default setRequestIdHeader;
