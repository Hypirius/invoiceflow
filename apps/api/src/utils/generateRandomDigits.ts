import crypto from "node:crypto";

function generateRandomDigits(minValue: number, maxValue: number) {
  return crypto.randomInt(minValue, maxValue);
}

export default generateRandomDigits;
