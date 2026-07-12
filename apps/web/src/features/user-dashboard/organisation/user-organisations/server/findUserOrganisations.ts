import fetchUrls from "@/config/fetchUrls";
import handleFetch from "@/lib/handleFetch";
import { UserOrganisation } from "../types/UserOrganisation";
import getCookieString from "@/lib/getCookieString";
import { AppError } from "@/lib/AppError";

async function findUserOrganisations() {
  let isError: boolean = false;
  let error: string | null = null;
  let data: UserOrganisation[] | [] = [];
  try {
    const result = await handleFetch<UserOrganisation[]>({
      url: fetchUrls.organisation,
      method: "GET",
      headers: {
        Cookie: await getCookieString(),
      },
      credentials: true,
      cache: "force-cache",
      next: {
        tags: ["userOrganisations"],
        revalidate: 30,
      },
    });

    data = result.data as UserOrganisation[];
  } catch (err) {
    isError = true;
    if (err instanceof AppError) {
      console.log(err);
      error = err.message;
    }
  }

  return {
    isError,
    error,
    data,
  };
}

export default findUserOrganisations;
