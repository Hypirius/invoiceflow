import validateSchema from "@/features/auth/utils/validateSchema";
import { organisationDetailsSchema } from "@repo/zod-schema/organisation/organisationDetails.schema.ts";
import { organisationDetailsType } from "@repo/zod-schema/organisation/types/organisationDetails.types.ts";
import createOrganisationInDB from "./createOrganisation.repository";
import {
  checkIdempotencyCache,
  fillIdempotencyCache,
} from "@/utils/Idempotency";
import generateExpiryTime from "@/utils/generateExpiryTime";

async function createOrganisationService(
  data: organisationDetailsType,
  userId: string,
  reqId: string,
) {
  const details = validateSchema(organisationDetailsSchema, data);

  const IdempotencyData = await checkIdempotencyCache(reqId);

  if (IdempotencyData) {
    return JSON.parse(IdempotencyData);
  }

  await createOrganisationInDB(details, userId);

  await fillIdempotencyCache(reqId, details, generateExpiryTime("30m"));
}

export default createOrganisationService;
