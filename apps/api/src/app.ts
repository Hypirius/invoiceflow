import express from "express";
import { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import config from "./config/env";

const app: Express = express();

app.use(helmet());
app.use(cors({ origin: [config.CLIENT_URL] }));

export default app;
