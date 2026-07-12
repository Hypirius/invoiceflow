import prisma from "@/config/db";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";
import { ChangeUserDetailsType } from "@repo/zod-schema/change-details/types/changeDetails.types.ts";
import { ValidationError } from "@/lib/errors/ErrorClasses";
import { UserNotFoundError } from "../utils/ErrorClass";

async function updateDetails(
  {
    email,
    displayName,
    profileImage,
    fullName,
    passwordDetails,
  }: ChangeUserDetailsType,
  id: string,
) {
  try {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        displayName,
        profileImage,
        fullName,
        password: passwordDetails?.newPassword,
      },
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
        fullName: true,
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
