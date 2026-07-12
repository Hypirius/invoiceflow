import z from "zod";

const addressSchema = z.object({
  country: z.string().trim(),
  streetAddress: z.string().trim(),
  state: z.string().trim(),
  city: z.string().trim(),
  zipCode: z.string().trim(),
});

const organisationDetailsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { error: "Name must be greater than 3 characters" })
    .max(32, { error: "Name must be less than 32 characters" }),
  email: z.email().trim(),
  phoneNumber: z.string().trim().min(5, {
    error: "Phone number must be greater than 5 characters or digits",
  }),
  logoLink: z.string({ error: "Organisation must have an image" }).trim(),
  address: addressSchema,
});

export { organisationDetailsSchema, addressSchema };
