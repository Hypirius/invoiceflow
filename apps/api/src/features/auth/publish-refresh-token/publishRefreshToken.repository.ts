import prisma from "@/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { TokenExistsError } from "../utils/ErrorClass";
import processDBError from "../utils/processDBError";

export type RefreshTokenType = {
  expiresAt: Date;
  oldToken: string | null;
  token: string;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
  deviceId: string;
};

async function createRefreshToken(data: RefreshTokenType) {
  try {
    const result = await prisma.refreshTokens.upsert({
      where: {
        deviceId_userId: {
          deviceId: data.deviceId,
          userId: data.userId,
        },
      },
      update: {
        ...data,
      },
      create: { ...data },
      select: {
        expiresAt: true,
        oldToken: true,
        token: true,
        ipAddress: true,
        userAgent: true,
        userId: true,
        deviceId: true,
      },
    });

    if (!result) {
      throw new Error();
    }

    return result;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      throw new TokenExistsError();
    }
    processDBError(err);
  }
}
export { createRefreshToken };
