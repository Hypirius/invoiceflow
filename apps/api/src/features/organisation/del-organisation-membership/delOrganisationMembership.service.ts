import validateSchema from "@/features/auth/utils/validateSchema";
import { delOrganisationMemberships } from "@repo/zod-schema/organisation/delOrganisationMembership.schema.ts";
import { delOrganisationMembershipsType } from "@repo/zod-schema/organisation/types/delOrganisationMemberships.types.ts";
import delOrganisationMembershipInDB from "./delOrganisationMembership.repository";

async function delOrganisationService(
  data: delOrganisationMembershipsType,
  userId: string,
) {
  const validationResult = validateSchema(delOrganisationMemberships, data);

  await delOrganisationMembershipInDB(validationResult, userId);
}

export default delOrganisationService;
