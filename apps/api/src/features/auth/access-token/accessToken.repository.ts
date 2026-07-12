import prisma from "@/config/db";
import { TokenUserNotExistsError } from "../utils/ErrorClass";

async function findDetailsByRefreshToken(refreshToken: string) {
  const tokenDetails = await prisma.refreshTokens.findUnique({
    where: {
      token: refreshToken,
    },
    select: {
      expiresAt: true,
      token: true,
      oldToken: true,
      user: {
        select: {
          id: true,
          email: true,
          fullName: true,
          displayName: true,
          role: true,
        },
      },
    },
  });

  if (!tokenDetails) {
    throw new TokenUserNotExistsError();
  }

  return tokenDetails;
}

async function invalidateAllUserRefreshTokens(id: string) {
  await prisma.refreshTokens.deleteMany({
    where: {
      userId: id,
    },
  });
}

export { findDetailsByRefreshToken, invalidateAllUserRefreshTokens };
