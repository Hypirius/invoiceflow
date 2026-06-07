import prisma from "@/config/db";
import { changeDetailsType } from "../types";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";
import { ValidationError } from "@/lib/errors/ErrorClasses";
import { UserNotFoundError } from "../utils/ErrorClass";

interface updateDetailsType extends changeDetailsType {
  refreshToken: string;
}

async function updateDetails(id: string, details: updateDetailsType) {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: { ...details },
    });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      throw new ValidationError();
    } else if (
      err instanceof PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      throw new UserNotFoundError();
    } else {
      throw err;
    }
  }
}

async function findUserDetails(id: string) {
  try {
    return await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        email: true,
        displayName: true,
        password: true,
        role: true,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
      throw new UserNotFoundError();
    }
    throw err;
  }
}

export { updateDetails, findUserDetails };
