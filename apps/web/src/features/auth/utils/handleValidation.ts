import z from "zod";
import { TypedErrorTree } from "../types";

export default function handleValidation<T extends z.ZodTypeAny>(
  schema: T,
  item: unknown,
):
  | { success: true; data: z.infer<T> }
  | { success: false; errors: TypedErrorTree<z.infer<T>> } {
  const result = schema.safeParse(item);

  if (!result.success) {
    return {
      success: false,
      errors: z.treeifyError(result.error) as TypedErrorTree<z.infer<T>>,
    };
  }

  return { success: true, data: result.data };
}

// TODO: change the schema type to an up to date type
