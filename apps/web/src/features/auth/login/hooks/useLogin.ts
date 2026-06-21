import { useMutation } from "@tanstack/react-query";
import postDetails from "../../server/postDetails";
import { userLoginDetailsType } from "@repo/zod-schema/auth/types/login.types.js";

export default function useLogin() {
  return useMutation({
    mutationFn: (data: userLoginDetailsType) =>
      postDetails<userLoginDetailsType>(
        data,
        "http://localhost:3000/v1/auth/login",
      ),
    mutationKey: ["postLogin"],
  });
}

// TODO: Optimize this, maybe use lifecycle methods
