import { ValidationError } from "@/lib/errors/ErrorClasses";
import { PrismaClientValidationError } from "@prisma/client/runtime/client";

function processDBError(err: unknown) {
  if (err instanceof PrismaClientValidationError) {
    throw new ValidationError();
  } else {
    throw err;
  }
}

export default processDBError;
