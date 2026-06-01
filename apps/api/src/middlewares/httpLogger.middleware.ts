import pinoHttp from "pino-http";
import logger from "../config/logger";

const httpLogger = pinoHttp({
  logger,
  serializers: {
    req(req) {
      return {
        id: req.headers["request-id"],
        method: req.method,
        url: req.url,
        userAgent: req.headers["user-agent"],
      };
    },

    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },

  customLogLevel(req, res, err) {
    if (res.statusCode >= 500 || err) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});

export { httpLogger };
// TODO: check the args of customLogLevel: potential error
