import { ValidationError } from "@/lib/errors/ErrorClasses";
import * as z from "zod";

function validateSchema<T>(schema: z.ZodType<T>, data: T) {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError(result.error.issues);
  }

  return result.data;
}

export default validateSchema;
