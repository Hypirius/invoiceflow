import z from "zod";

const uploadTypeSchema = z.union(
  [
    z.literal("profile-image"),
    z.literal("organisation-logo"),
    z.literal("invoice-pdf"),
  ],
  { message: "Incorrect upload type is provided to query parameters" },
);

type uploadType = z.infer<typeof uploadTypeSchema>;

export { uploadTypeSchema, type uploadType };
