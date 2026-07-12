import { cookies } from "next/headers";
import verifyJwt from "./verifyJwt";
import "server-only";

async function getUserDetails() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    return { isError: true, error: "Access token missing", data: null };
  }

  return await verifyJwt(accessToken);
}

export default getUserDetails;
