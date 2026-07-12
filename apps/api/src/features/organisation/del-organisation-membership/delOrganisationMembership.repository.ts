import prisma from "@/config/db";
import { Prisma } from "../../../../prisma/generated/prisma/client";
import { delOrganisationMembershipsType } from "@repo/zod-schema/organisation/types/delOrganisationMemberships.types.js";
import { UserOrganisationsNotFoundError } from "../ErrorClass";

async function deleteOrganisation(
  tx: Prisma.TransactionClient,
  organisationIds: number[],
) {
  // Organisation and its dependencies are removed
  await tx.organisation.deleteMany({
    where: {
      id: {
        in: organisationIds,
      },
    },
  });
}

async function delOrganisationMembershipInDB(
  data: delOrganisationMembershipsType,
  userId: string,
) {
  return await prisma.$transaction(async (tx) => {
    const allSelectedOrganisations = await tx.organisationMembers.findMany({
      where: {
        organisationId: {
          in: data,
        },
        userId,
      },
      select: {
        id: true,
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });

    if (!allSelectedOrganisations.length) {
      throw new UserOrganisationsNotFoundError();
    }

    let pendingRemovalOrganisations = [...data];

    const ownedOrganisations = allSelectedOrganisations.filter(
      (item) => item.role.roleName === "owner",
    );

    if (ownedOrganisations.length > 0) {
      const ownedOrganisationsIds = ownedOrganisations.map((item) => item.id);

      await deleteOrganisation(tx, ownedOrganisationsIds);

      pendingRemovalOrganisations = pendingRemovalOrganisations.filter(
        (item) => !ownedOrganisationsIds.includes(item),
      );
    }

    await tx.organisationMembers.deleteMany({
      where: {
        organisationId: {
          in: pendingRemovalOrganisations,
        },
        userId,
      },
    });
  });
}

export default delOrganisationMembershipInDB;
