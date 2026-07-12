import { AppError, FetchError } from "@/lib/AppError";
import { ApiErrorRes, ApiRes, ApiSuccessRes } from "@/types/ApiRes";

//TODO: discriminated union can be used

export type FetchParams<TInputData> = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: TInputData;
  headers?: HeadersInit;
  credentials?: boolean;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

async function handleFetch<TResData, TInputData = unknown>({
  url,
  method,
  data,
  headers,
  credentials,
  cache,
  next,
}: FetchParams<TInputData>) {
  const res = await fetch(url, {
    method,
    body: data && JSON.stringify(data),
    credentials: credentials ? "include" : "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    cache: cache || "default",
    next,
  });

  let jsonResult: ApiRes<TResData> | null = null;

  try {
    jsonResult = await res.json();
  } catch {
    jsonResult = null;
  }

  if (!res.ok) {
    if (jsonResult) {
      const errorResult = jsonResult as ApiErrorRes;
      console.log(errorResult);
      throw new AppError(errorResult.message, errorResult.code);
    }

    throw new FetchError();
  }

  if (!jsonResult) {
    return { success: true } as ApiSuccessRes<null>;
  }

  return jsonResult as ApiSuccessRes<TResData>;
}

export default handleFetch;
