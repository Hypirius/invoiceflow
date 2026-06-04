import express from "express";
import { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config/env";
import allowedClients from "./middlewares/allowedclients.middleware";
import setRequestIdHeader from "./middlewares/setReqIdHeader.middleware";
import { httpLogger } from "./middlewares/httpLogger.middleware";
import globalErrorMiddleware from "./middlewares/globalError.middleware";
import authRouter from "./features/auth/auth.route";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(setRequestIdHeader());
app.use(helmet());
app.use(httpLogger);
app.use(allowedClients());
app.use(cors({ origin: config.WHITELIST_CLIENTS }));
app.use(express.json());
app.use(cookieParser());
app.use("/v1", authRouter);
app.use(globalErrorMiddleware);

export default app;
