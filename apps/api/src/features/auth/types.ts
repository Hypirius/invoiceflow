import { JWTPayload } from "jose";

interface JwtPayloadType extends JWTPayload {
  sub: string;
  email: string;
  displayName: string;
  role: string;
  typ?: "refresh";
}

export type { JwtPayloadType };

// TODO: Will need to be changed to support other related features
