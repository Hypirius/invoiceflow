import prisma from "@/config/db";
import { Prisma } from "../../../prisma/generated/prisma/client";

async function updateOrganisationById(
  id: number,
  updateParams: Prisma.OrganisationUpdateInput,
) {
  return await prisma.organisation.update({
    where: {
      id,
    },
    data: updateParams,
  });
}

export default updateOrganisationById;
