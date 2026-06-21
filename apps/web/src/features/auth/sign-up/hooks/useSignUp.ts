import { useMutation } from "@tanstack/react-query";
import postDetails from "../../server/postDetails";
import { SignUpDetailsType, SignUpResponseType } from "../../types";

export default function useSignUp() {
  return useMutation<SignUpResponseType, Error, SignUpDetailsType>({
    mutationFn: (data) =>
      postDetails<SignUpDetailsType>(
        data,
        "http://localhost:3000/v1/auth/sign-up",
      ),
    mutationKey: ["postSignUp"],
  });
}
