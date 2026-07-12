import { Request } from "express";

function getRequestUrl(req: Request) {
  const domainUrl = `${req.protocol}${req.get("host")}`;
  return {
    domainUrl,
    fullUrl: `${domainUrl}${req.originalUrl}`,
  };
}

export default getRequestUrl;
