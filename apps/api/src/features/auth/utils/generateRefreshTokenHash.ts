import { randomBytes } from "node:crypto";
import { promisify } from "node:util";
import hashify from "./hashify";

const getRandomString = promisify(randomBytes);

async function generateRefreshTokenHash() {
  const randomString = await getRandomString(32);
  return await hashify(randomString.toString("base64"));
}

export default generateRefreshTokenHash;
