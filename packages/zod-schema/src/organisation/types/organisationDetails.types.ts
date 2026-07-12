import z from "zod";
import { organisationDetailsSchema } from "../organisationDetails.schema";

type organisationDetailsType = z.infer<typeof organisationDetailsSchema>;

export type { organisationDetailsType };
