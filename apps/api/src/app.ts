import express from "express";
import { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config/env";
import allowedClients from "./middlewares/allowedclients.middleware";

const app: Express = express();

app.use(helmet());
app.use(cors({ origin: config.WHITELIST_CLIENTS }));
app.use(allowedClients());

export default app;
