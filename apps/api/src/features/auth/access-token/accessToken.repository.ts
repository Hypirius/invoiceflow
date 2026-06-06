import prisma from "@/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { UserNotFoundError } from "../utils/ErrorClass";

async function findRefreshTokenById(id: string) {
  const token = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      refreshToken: true,
    },
  });

  if (!token) {
    throw new UserNotFoundError();
  }

  return token;
}

async function updateDBRefreshToken(id: string, refreshToken: string) {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
      throw new UserNotFoundError();
    } else {
      throw err;
    }
  }
}

export { findRefreshTokenById, updateDBRefreshToken };
