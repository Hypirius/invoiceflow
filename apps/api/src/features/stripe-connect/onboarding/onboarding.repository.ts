import prisma from "@/config/db";

async function updateOrganisationStripeId(id: number, stripeAccountId: string) {
  return await prisma.organisation.update({
    where: {
      id,
    },
    data: {
      stripeAccountId,
    },
  });
}

export default updateOrganisationStripeId;
