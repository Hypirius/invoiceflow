import z from "zod";

const userLoginDetailsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export { userLoginDetailsSchema };
