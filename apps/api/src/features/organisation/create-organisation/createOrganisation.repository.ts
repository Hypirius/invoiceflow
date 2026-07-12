import prisma from "@/config/db";
import { organisationDetailsType } from "@repo/zod-schema/organisation/types/organisationDetails.types.js";
import { Prisma } from "../../../../prisma/generated/prisma/client";

function createPermissionDetails(
  roleId: number,
  action: "read" | "create" | "update" | "delete",
  resource: "all" | "invoice" | "reports",
) {
  return {
    roleId,
    action,
    resource,
  };
}

async function createOrganisationInDB(
  data: organisationDetailsType,
  userId: string,
) {
  return await prisma.$transaction(async (tx) =>
    handleOrganisationTransaction(tx, data, userId),
  );
}

async function handleOrganisationTransaction(
  tx: Prisma.TransactionClient,
  data: organisationDetailsType,
  userId: string,
) {
  const { name, phoneNumber, logoLink, address, email } = data;

  const { id: addressId } = await tx.address.create({
    data: address,
    select: {
      id: true,
    },
  });

  const { id: organisationId } = await tx.organisation.create({
    data: {
      email,
      address: addressId,
      name,
      phoneNumber,
      logoLink,
    },
    select: {
      id: true,
    },
  });

  const { id: ownerRoleId } = await tx.organisationRoles.create({
    data: {
      organisationId,
      roleName: "owner",
    },
    select: {
      id: true,
    },
  });

  await tx.memberPermissions.createMany({
    data: [
      createPermissionDetails(ownerRoleId, "read", "all"),
      createPermissionDetails(ownerRoleId, "create", "all"),
      createPermissionDetails(ownerRoleId, "update", "all"),
      createPermissionDetails(ownerRoleId, "delete", "all"),
    ],
  });

  await tx.organisationMembers.create({
    data: {
      organisationId: organisationId,
      roleId: ownerRoleId,
      userId,
    },
    select: {
      id: true,
    },
  });
}

export default createOrganisationInDB;

//TODO: Can be optimized by using raw sql as prisma transaction will make extra round trips, DO ERROR HANDLING USING CUSTOM ERRORS!
