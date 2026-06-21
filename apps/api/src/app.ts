import express from "express";
import { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config/env";
import allowedClients from "./middlewares/allowedclients.middleware";
import setRequestIdHeader from "./middlewares/setReqIdHeader.middleware";
import { httpLogger } from "./middlewares/httpLogger.middleware";
import globalErrorMiddleware from "./middlewares/globalError.middleware";
import cookieParser from "cookie-parser";
import router from "./routes";

const app: Express = express();

app.use(setRequestIdHeader());
app.use(helmet());
app.use(httpLogger);
if (config.NODE_ENV === "production") {
  app.use(allowedClients());
}
app.use(cors({ origin: config.WHITELIST_CLIENTS, credentials: true }));
app.use(express.json());
app.use(cookieParser(config.COOKIE_SECRET));
app.use("/v1", router);
app.use(globalErrorMiddleware);

export default app;
