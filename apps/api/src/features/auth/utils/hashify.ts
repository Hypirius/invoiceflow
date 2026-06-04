import config from "../../../config/env";
import bcrypt from "bcrypt";

async function hashify(string: string) {
  return await bcrypt.hash(string, config.BCRYPT_SALT_ROUNDS);
}

export default hashify;
