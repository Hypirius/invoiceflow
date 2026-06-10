import z from "zod";

const callbackParamsSchema = z.object({
  code: z.string(),
  state: z.string(),
  clientState: z.string(),
  codeVerifier: z.string(),
});

export type callbackParamsSchemaType = z.infer<typeof callbackParamsSchema>;

export default callbackParamsSchema;
