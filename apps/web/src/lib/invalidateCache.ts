"use server";

import { revalidateTag } from "next/cache";

async function invalidateCache(tag: string) {
  revalidateTag(tag, { expire: 0 });
}

export default invalidateCache;
