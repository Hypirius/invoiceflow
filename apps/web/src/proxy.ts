/* eslint-disable turbo/no-undeclared-env-vars */
import { NextResponse, NextRequest } from "next/server";
import { JWTPayload, jwtVerify } from "jose";
import { JWSInvalid, JWTInvalid } from "jose/errors";

//NOTE: Some duplication was done in here as this will run separately in cdn edge therefore, should be decoupled as much as possible

const ACCESS_TOKEN_MAX_AGE = 30 * 60;

interface JWTDataType extends JWTPayload {
  sub: string;
  email: string;
  displayName: string;
  role: string;
}

const uint8SecretArray = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY as string,
);

const tokenFetchUrl =
  process.env.Token_Fetch_Url || "http://localhost:3000/v1/auth/access-token";

type FetchTokensResType = {
  newAccessToken: string;
  refreshTokenDetails: {
    token: string;
    maxAge: number;
  };
};

async function fetchTokens(oldRefreshToken: string, deviceId: string) {
  const res = await fetch(tokenFetchUrl, {
    method: "POST",
    body: JSON.stringify({
      oldRefreshToken,
      deviceId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tokens");
  }

  return (await res.json()).data as FetchTokensResType;
}

async function isJwtValid(accessToken: string) {
  let isError: boolean = false;
  let error: string | null = null;
  let isSuccess: boolean = true;

  try {
    const { payload } = await jwtVerify<JWTDataType>(
      accessToken,
      uint8SecretArray,
    );

    if (payload.sub) {
      isSuccess = true;
    }
  } catch (err) {
    isError = true;
    if (err instanceof JWTInvalid || err instanceof JWSInvalid) {
      error = err.message;
    }

    error = "Unknown details parsing error";
  }

  return {
    isError,
    error,
    isSuccess,
  };
}

export async function proxy(request: NextRequest) {
  const { url } = request;
  const loginPath = new URL("/login", url);

  const refreshToken = request.cookies.get("refresh_token")?.value;

  const deviceId = request.cookies.get("device_id")?.value;

  if (!refreshToken || !deviceId) {
    return NextResponse.redirect(loginPath);
  }

  const accessToken = request.cookies.get("access_token")?.value;

  if (!accessToken) {
    const tokens = await fetchTokens(refreshToken, deviceId);

    const reqHeaders = new Headers(request.headers);

    reqHeaders.set(
      "Cookie",
      `access_token=${tokens.newAccessToken}; refresh_token=${tokens.refreshTokenDetails.token}; device_id=${deviceId};`,
    );

    //TODO: SET COOKIE CONFIGS PROPERLY

    const response = NextResponse.next({
      request: {
        headers: reqHeaders,
      },
    });

    response.cookies.set("access_token", tokens.newAccessToken, {
      httpOnly: true,
      maxAge: ACCESS_TOKEN_MAX_AGE,
      path: "/",
    });

    response.cookies.set("refresh_token", tokens.refreshTokenDetails.token, {
      httpOnly: true,
      maxAge: tokens.refreshTokenDetails.maxAge,
      path: "/",
    });

    return response;
  }

  const { isError, error, isSuccess } = await isJwtValid(accessToken);

  if (isError) {
    console.log(error);
    return NextResponse.redirect(loginPath);
  }

  if (isSuccess) {
    NextResponse.next();
  }
}

export const config = {
  matcher: ["/user/dashboard/:path*", "/organisation/:path*"],
};
