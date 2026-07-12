import { JWTPayload } from "jose";

export interface JWTDataType extends JWTPayload {
  sub: string;
  email: string;
  displayName: string;
  role: string;
}
