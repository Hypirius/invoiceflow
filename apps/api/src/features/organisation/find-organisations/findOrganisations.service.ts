import validateSchema from "@/features/auth/utils/validateSchema";
import { findOrganisationByUserMembership } from "./findOrganisations.repository";
import z from "zod";

async function findOrganisationService(userId: string) {
  validateSchema(z.string(), userId);
  const data = await findOrganisationByUserMembership(userId);

  const structuredData = data.map((organisationItem) => {
    return {
      id: organisationItem.organisation.id,
      name: organisationItem.organisation.name,
      role: organisationItem.role.roleName,
      logoLink: organisationItem.organisation.logoLink,
      owner: organisationItem.organisation.organisationMembers[0]?.user,
    };
  });

  return structuredData;
}

export default findOrganisationService;
