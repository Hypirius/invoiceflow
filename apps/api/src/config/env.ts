import z from "zod";
import { config as dotenvConfig } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const pathToEnv = path.join(fileURLToPath(import.meta.url), "../../..");

const NODE_ENV = process.env.NODE_ENV || "development";

dotenvConfig({
  path: `${pathToEnv}/.env.${NODE_ENV}`,
});

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "tests"]),
  ROOT_FOLDER_PATH: z.string(),
  PORT: z.number().default(5000),
});

const config = configSchema.parse({
  NODE_ENV,
  ROOT_FOLDER_PATH: pathToEnv,
  PORT: Number(process.env.PORT),
});

export default config;
