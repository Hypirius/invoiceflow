import prisma from "@/config/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { UserExistsError } from "../utils/ErrorClass";
import { ValidationError } from "@/lib/errors/ErrorClasses";
import processDBError from "../utils/processDBError";

export type UserModelType = {
  id: string;
  email: string;
  fullName: string;
  password: string;
  displayName: string;
  profileImage: string;
};

async function createUser(data: UserModelType) {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      throw new UserExistsError();
    }
    processDBError(err);
  }
}

export { createUser };
