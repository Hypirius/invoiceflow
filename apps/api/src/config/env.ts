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
  DATABASE_URL: z.string(),
  WHITELIST_CLIENTS: z.array(z.url()),
});

const config = configSchema.parse({
  NODE_ENV,
  ROOT_FOLDER_PATH: pathToEnv,
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
  WHITELIST_CLIENTS: JSON.parse(process.env.WHITELIST_CLIENTS as string),
});

export default config;

// TODO: More refines can be used to ensure exact intended matches of properties, I.E: constrainting DB url from string to exact postresql link
