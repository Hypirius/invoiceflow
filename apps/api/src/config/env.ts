import z from "zod";
import { config as dotenvConfig } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const pathToEnv = path.join(fileURLToPath(import.meta.url), "../../..");

const NODE_ENV = process.env.NODE_ENV || "development";

dotenvConfig({
  path: `${pathToEnv}/.env.${NODE_ENV}`,
  quiet: true,
});

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "tests"]),
  ROOT_FOLDER_PATH: z.string(),
  PORT: z.number().default(5000),
  DATABASE_URL: z.string(),
  WHITELIST_CLIENTS: z.array(z.url()),
  BCRYPT_SALT_ROUNDS: z.number(),
  JWT_SECRET_KEY: z.instanceof(Uint8Array),
  JWT_ACCESS_EXPIRES_IN: z.string().or(z.number()),
  JWT_REFRESH_EXPIRES_IN: z.string().or(z.number()),
  COOKIE_SECRET: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_UPLOAD_FOLDER: z.string(),
  EMAIL_SERVICE_SECRET: z.string(),
  EMAIL_FROM: z.string(),
  EMAIL_TEMPLATE_ID: z.string(),
  REDIS_URL: z.string(),
  GOOGLE_OAUTH_ID: z.string(),
  GOOGLE_OAUTH_SECRET_KEY: z.string(),
  OAUTH_REDIRECT_URL: z.url(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_CONNECT_SECRET: z.string(),
});

const config = configSchema.parse({
  NODE_ENV,
  ROOT_FOLDER_PATH: pathToEnv,
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL,
  WHITELIST_CLIENTS: JSON.parse(process.env.WHITELIST_CLIENTS as string),
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS),
  JWT_SECRET_KEY: new TextEncoder().encode(process.env.JWT_SECRET_KEY),
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_FOLDER: process.env.CLOUDINARY_UPLOAD_FOLDER,
  EMAIL_SERVICE_SECRET: process.env.EMAIL_SERVICE_SECRET,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
  REDIS_URL: process.env.REDIS_URL,
  GOOGLE_OAUTH_ID: process.env.GOOGLE_OAUTH_ID,
  GOOGLE_OAUTH_SECRET_KEY: process.env.GOOGLE_OAUTH_SECRET_KEY,
  OAUTH_REDIRECT_URL: process.env.OAUTH_REDIRECT_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_CONNECT_SECRET: process.env.STRIPE_WEBHOOK_CONNECT_SECRET,
});
export default config;

// TODO: More refines can be used to ensure exact intended matches of properties, I.E: constrainting DB url from string to exact postresql link
