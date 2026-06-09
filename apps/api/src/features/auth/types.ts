import { userSignUpDetailsType } from "@repo/zod-schema/auth/types/signUp.types.js";
import { JWTPayload } from "jose";

interface JwtPayloadType extends JWTPayload {
  sub: string;
  email: string;
  displayName: string;
  role: string;
  typ?: "refresh";
}

type EmailRedisPayload = {
  email: string;
  otp: number;
  userId: string | null;
  attempts: number;
  invalid: boolean;
  expiresAt: number;
};

export type changeDetailsType = Partial<userSignUpDetailsType>;

export type { JwtPayloadType, EmailRedisPayload };

// TODO: Will need to be changed to support other related features
