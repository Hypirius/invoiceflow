import bcrypt from "bcrypt";

async function compareHash(plainText: string, hashedText: string) {
  return await bcrypt.compare(plainText, hashedText);
}

export default compareHash;
