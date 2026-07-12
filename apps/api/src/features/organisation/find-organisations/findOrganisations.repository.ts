import prisma from "@/config/db";
import { UserOrganisationsNotFoundError } from "../ErrorClass";

async function findOrganisationByUserMembership(userId: string) {
  const result = await prisma.organisationMembers.findMany({
    where: {
      userId,
    },
    select: {
      organisation: {
        select: {
          id: true,
          name: true,
          logoLink: true,
          organisationMembers: {
            where: {
              role: {
                roleName: "owner",
              },
            },
            select: {
              user: {
                select: {
                  id: true,
                  fullName: true,
                  displayName: true,
                  profileImage: true,
                },
              },
            },
          },
        },
      },
      role: {
        select: {
          roleName: true,
        },
      },
    },
  });

  if (!result) {
    throw new UserOrganisationsNotFoundError();
  }

  return result;
}

export { findOrganisationByUserMembership };
