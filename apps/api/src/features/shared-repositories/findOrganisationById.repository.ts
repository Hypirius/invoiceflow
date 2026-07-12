import prisma from "@/config/db";
import { Prisma } from "../../../prisma/generated/prisma/client";

async function findOrganisationById<T extends Prisma.OrganisationSelect>(
  id: number,
  selectParams?: Prisma.SelectSubset<T, Prisma.OrganisationSelect>,
) {
  return await prisma.organisation.findUniqueOrThrow({
    where: {
      id,
    },
    select: selectParams,
  });
}

export default findOrganisationById;
