import * as jose from "jose";
import config from "@/config/env";
import { JwtPayloadType } from "../types";

type payloadType = Record<any, any>;

async function generateJWT(payload: payloadType, expiresIn: string | number) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("invoiceflow-backend")
    .setAudience("invoiceflow-frontend")
    .setExpirationTime(expiresIn)
    .setJti(String(Math.floor(Math.random() * 90000 + 10000)))
    .sign(config.JWT_SECRET_KEY);
}

async function generateAccessToken(payload: JwtPayloadType) {
  return await generateJWT(payload, config.JWT_ACCESS_EXPIRES_IN);
}

async function generateRefreshToken(payload: JwtPayloadType) {
  return await generateJWT(payload, config.JWT_REFRESH_EXPIRES_IN);
}

async function generateDualTokens(payload: JwtPayloadType) {
  return {
    accessToken: await generateAccessToken(payload),
    refreshToken: await generateRefreshToken({ ...payload, typ: "refresh" }),
  };
}

export {
  generateJWT,
  generateAccessToken,
  generateRefreshToken,
  generateDualTokens,
};
