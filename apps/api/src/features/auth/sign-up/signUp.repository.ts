import prisma from "@/config/db";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";
import { TokenExistsError, UserExistsError } from "../utils/ErrorClass";
import { ValidationError } from "@/lib/errors/ErrorClasses";

export type UserModelType = {
  id: string;
  email: string;
  fullName: string;
  password: string;
  displayName: string;
  profileImage: string;
};

export type RefreshTokenType = {
  expiresAt: Date;
  oldToken: string | null;
  token: string;
  ipAddress: string | null;
  userAgent: string | null;
  userId: string;
  deviceId: string;
};

function checkCreationError(err: unknown) {
  if (err instanceof PrismaClientValidationError) {
    throw new ValidationError();
  } else {
    throw err;
  }
}

async function createUser(data: UserModelType) {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      throw new UserExistsError();
    }
    checkCreationError(err);
  }
}

async function createRefreshToken(data: RefreshTokenType) {
  try {
    return await prisma.refreshTokens.create({
      data,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      throw new TokenExistsError();
    }
    checkCreationError(err);
  }
}

export { createUser, createRefreshToken };
