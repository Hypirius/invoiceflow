import pino from "pino";
import config from "./env";

const isDev = config.NODE_ENV === "development";

const logger = pino({
  level: isDev ? "debug" : "info",
  base: {
    service: "invoiceflow-api",
    env: config.NODE_ENV,
  },
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:HH:MM:ss",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

export default logger;
