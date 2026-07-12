import { FetchParams } from "@/lib/handleFetch";

export type CustomMutationHook<TInputData> = Omit<
  FetchParams<TInputData>,
  "method" | "data"
> & {
  key: string;
};
