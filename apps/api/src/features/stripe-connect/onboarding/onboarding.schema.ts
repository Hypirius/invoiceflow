import z from "zod";

const onboardingSchema = z.object({
  organisationId: z.coerce.number(),
  domainUrl: z.string(),
});

export default onboardingSchema;
