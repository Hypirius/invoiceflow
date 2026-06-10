import prisma from "@/config/db";

type createOauthUserData = {
  providerId: string | null;
  issuer: string;
  userId: string;
};

async function createOauthUser(data: createOauthUserData) {
  const result = await prisma.oauthProvider.create({ data });

  return result;
}

export { createOauthUser };
