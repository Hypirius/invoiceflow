import prisma from "@/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { TokenUserNotExistsError } from "../utils/ErrorClass";

async function findRefreshTokenByUserAndDeviceId(
  userId: string,
  deviceId: string,
) {
  const token = await prisma.refreshTokens.findUnique({
    where: {
      deviceId_userId: {
        deviceId,
        userId,
      },
    },
    select: {
      expiresAt: true,
      token: true,
    },
  });

  if (!token) {
    throw new TokenUserNotExistsError();
  }

  return token;
}

async function updateRefreshTokenOldToken(
  userId: string,
  deviceId: string,
  oldRefreshToken: string,
) {
  try {
    return await prisma.refreshTokens.update({
      where: {
        deviceId_userId: {
          userId,
          deviceId,
        },
      },
      data: {
        oldToken: oldRefreshToken,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
      throw new TokenUserNotExistsError();
    } else {
      throw err;
    }
  }
}

async function updateRefreshToken(
  userId: string,
  deviceId: string,
  refreshToken: string,
) {
  try {
    return await prisma.refreshTokens.update({
      where: {
        deviceId_userId: {
          userId,
          deviceId,
        },
      },
      data: {
        token: refreshToken,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
      throw new TokenUserNotExistsError();
    } else {
      throw err;
    }
  }
}

export {
  findRefreshTokenByUserAndDeviceId,
  updateRefreshTokenOldToken,
  updateRefreshToken,
};
