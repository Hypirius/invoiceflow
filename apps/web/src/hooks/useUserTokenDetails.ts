"use client";

//NOTE: This is for client side access to jwt payload data WITHOUT jwt verification
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
import { decodeJwt } from "jose";
import { JWTDataType } from "../types/JwtPayload";

function useUserTokenDetails() {
  const [userDetails, setUserDetails] = useState<JWTDataType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const accessToken = getCookie("access_token");

      if (!accessToken) {
        throw new Error("No access token for user details was found");
      }

      const claims = decodeJwt<JWTDataType>(accessToken);
      setUserDetails(claims);
    } catch (err) {
      setError(err as Error);
    }
  }, []);

  return { userDetails, error };
}

export default useUserTokenDetails;
