import prisma from "@/config/db";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/client";
import { UserExistsError } from "../utils/ErrorClass";
import { ValidationError } from "@/lib/errors/ErrorClasses";

export type UserModelType = {
  id: string;
  email: string;
  fullName: string;
  password: string;
  displayName: string;
  profileImage: string;
  refreshToken: string;
};

async function createUser(data: UserModelType) {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      throw new UserExistsError();
    } else if (err instanceof PrismaClientValidationError) {
      throw new ValidationError();
    } else {
      throw err;
    }
  }
}

export { createUser };
