import prisma from "@/config/db";
import { ValidationError } from "@/lib/errors/ErrorClasses";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";

async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        displayName: true,
        fullName: true,
        profileImage: true,
        role: true,
      },
    });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      throw new ValidationError();
    } else {
      throw err;
    }
  }
}

export default findUserByEmail;
