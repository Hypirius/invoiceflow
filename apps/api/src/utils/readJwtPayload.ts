import { JwtPayloadType } from "@/features/auth/types";

function readJwtPayload(headers: Record<any, any>) {
  return JSON.parse(headers["jwt-payload"]) as JwtPayloadType;
}

export default readJwtPayload;
